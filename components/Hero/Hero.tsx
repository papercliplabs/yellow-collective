import { BigNumber, ethers, utils } from "ethers";
import Image from "next/image";
import { CountdownDisplay } from "../CountdownDisplay";
import { useCurrentAuctionInfo, useContractInfo, useTokenInfo } from "hooks";
import { compareAddress } from "@/utils/compareAddress";
import { SettleAuction } from "./SettleAuction";
import { PlaceBid } from "./PlaceBid";
import { HighestBidder } from "./HighestBidder";
import { Fragment, useEffect, useState } from "react";
import { AuctionInfo } from "@/services/nouns-builder/auction";
import { ContractInfo } from "@/services/nouns-builder/token";
import { usePreviousAuctions } from "@/hooks/fetch/usePreviousAuctions";
import { shortenAddress } from "@/utils/shortenAddress";
import UserAvatar from "../UserAvatar";
import { useRouter } from "next/router";
import Button from "../Button";
import clsx from "clsx";
import useEnsName from "@/hooks/useEnsName";

export default function Hero() {
    const { data: contractInfo } = useContractInfo();
    const { data: auctionInfo, mutate: mutateCurrentAuctionInfo } = useCurrentAuctionInfo({
        auctionContract: contractInfo?.auction,
    });
    const { query, push } = useRouter();

    const currentTokenId = auctionInfo ? auctionInfo?.tokenId : "";

    const tokenId = query.tokenid ? BigNumber.from(query.tokenid as string).toHexString() : currentTokenId;

    const { data: tokenInfo } = useTokenInfo({ tokenId });
    const [imageLoaded, setImageLoaded] = useState(false);

    const pageBack = () => {
        const bnTokenId = BigNumber.from(tokenId);
        if (bnTokenId.eq(0)) return;
        setImageLoaded(false);
        push(`/token/${bnTokenId.sub(1).toNumber()}`, undefined, {
            shallow: true,
        });
    };

    const pageForward = () => {
        const bnTokenId = BigNumber.from(tokenId);
        if (bnTokenId.eq(currentTokenId)) return;
        push(`/token/${bnTokenId.add(1).toNumber()}`, undefined, {
            shallow: true,
        });
    };

    return (
        <div className="bg-transparent max-w-[374px] md:max-w-[500px] lg:max-w-5xl flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-start py-[48px] md:py-[64px] gap-8 md:gap-16 px-4 md:px-10">
            <div className="h-[342px] w-[342px] md:w-[420px] md:h-[420px] relative shrink-0 rounded-[48px] md:rounded-[64px] border-[3px] border-transparent/10 overflow-hidden  flex justify-center items-center">
                {tokenInfo && (
                    <Image
                        src={tokenInfo?.image}
                        onLoad={() => setImageLoaded(true)}
                        fill={true}
                        alt=""
                        className={clsx(imageLoaded ? "visible" : "invisible")}
                    />
                )}
                <Image
                    src="/loading.gif"
                    alt="loading"
                    fill
                    className={clsx("bg-secondary", tokenInfo && imageLoaded ? "invisible" : "visible")}
                />
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex items-center mb-4 gap-4">
                    <Button variant="secondary" size="icon" onClick={pageBack} disabled={tokenId == "0x00"}>
                        <Image src="/arrow-left.svg" width={24} height={24} alt="back" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={pageForward} disabled={tokenId == currentTokenId}>
                        <Image src="/arrow-right.svg" width={24} height={24} alt="back" />
                    </Button>
                </div>

                <h1>Collective Noun #{parseInt(tokenId, 16)}</h1>

                {tokenId === currentTokenId ? (
                    <CurrentAuction
                        auctionInfo={auctionInfo}
                        contractInfo={contractInfo}
                        tokenId={currentTokenId}
                        revalidateAuctionInfo={async () => {
                            await mutateCurrentAuctionInfo();
                            return;
                        }}
                    />
                ) : (
                    <EndedAuction auctionContract={contractInfo?.auction} tokenId={tokenId} owner={tokenInfo?.owner} />
                )}
            </div>
        </div>
    );
}

const EndedAuction = ({
    auctionContract,
    tokenId,
    owner,
}: {
    auctionContract?: string;
    tokenId?: string;
    owner?: `0x${string}`;
}) => {
    const { data } = usePreviousAuctions({ auctionContract });
    const auctionData = data?.find((auction) => compareAddress(auction.tokenId, tokenId || ""));

    const ensName = useEnsName(owner);

    return (
        <div className="flex flex-col md:flex-row md:flex-wrap justify-start w-full gap-4 md:gap-12">
            <div className="flex flex-col gap-2 shrink-0">
                <div className="font-light">Winning Bid</div>
                <h3>{auctionData ? `Ξ ${utils.formatEther(auctionData.amount || "0")}` : "n/a"}</h3>
            </div>
            <div className="flex flex-col gap-2">
                <div className="font-light">Held by</div>
                <div className="flex items-center">
                    <UserAvatar
                        diameter={32}
                        className="w-8 h-8 rounded-full mr-2"
                        address={owner || ethers.constants.AddressZero}
                    />
                    <h3>{ensName || shortenAddress(owner || ethers.constants.AddressZero)}</h3>
                </div>
            </div>
        </div>
    );
};

const CurrentAuction = ({
    auctionInfo,
    contractInfo,
    tokenId,
    revalidateAuctionInfo,
}: {
    auctionInfo?: AuctionInfo;
    contractInfo?: ContractInfo;
    tokenId: string;
    revalidateAuctionInfo: () => Promise<void>;
}) => {
    const [auctionOver, setAuctionOver] = useState<boolean>(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const timeRemaining = Math.max((auctionInfo?.endTime || 0) - Math.round(Date.now() / 1000), 0);
            setAuctionOver(timeRemaining == 0);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [auctionInfo]);

    const ensName = useEnsName(auctionInfo?.highestBidder);

    return (
        <Fragment>
            <div className="flex flex-row flex-wrap md:justify-start w-full gap-8 md:gap-12">
                <div className="flex flex-col gap-2">
                    <div className="font-light">{auctionOver ? "Winning Bid" : "Current Bid"}</div>
                    <h3>Ξ {utils.formatEther(auctionInfo?.highestBid || "0")}</h3>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="font-light">{auctionOver ? "Winner" : "Auction ends in"}</div>
                    <h3>
                        {auctionOver ? (
                            ensName || shortenAddress(auctionInfo?.highestBidder || ethers.constants.AddressZero)
                        ) : (
                            <CountdownDisplay to={auctionInfo?.endTime || "0"} />
                        )}
                    </h3>
                </div>
            </div>

            {auctionOver ? (
                <SettleAuction auction={contractInfo?.auction} onSettled={revalidateAuctionInfo} />
            ) : (
                <PlaceBid
                    highestBid={auctionInfo?.highestBid || "0"}
                    auction={contractInfo?.auction}
                    tokenId={tokenId}
                    onNewBid={revalidateAuctionInfo}
                />
            )}

            {!auctionOver &&
                auctionInfo?.highestBidder &&
                !compareAddress(auctionInfo?.highestBidder, ethers.constants.AddressZero) && (
                    <HighestBidder address={auctionInfo?.highestBidder} />
                )}
        </Fragment>
    );
};

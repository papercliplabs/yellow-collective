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
import { zeroAddress } from "viem";
import { formatNumber } from "@/utils/formatNumber";

export default function Hero() {
    const { data: contractInfo } = useContractInfo();
    const { data: auctionInfo, mutate: mutateCurrentAuctionInfo } = useCurrentAuctionInfo({
        auctionContract: contractInfo?.auction,
    });
    const { query, push } = useRouter();

    const currentTokenId = auctionInfo ? auctionInfo?.tokenId : "";

    const tokenId = query.tokenid ? BigNumber.from(query.tokenid as string).toHexString() : currentTokenId;

    const { data: tokenInfo, mutate: mutateTokenInfo } = useTokenInfo({ tokenId });
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
        <div className="bg-transparent max-w-[374px] md:max-w-[500px] lg:max-w-6xl lg:w-[1100px] flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-start py-[48px] md:py-[64px] gap-8 md:gap-16 px-4 md:px-10">
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
            <div className="flex flex-col gap-6 max-w-full overflow-hidden">
                <div className="flex items-center mb-4 gap-4">
                    <Button variant="secondary" size="icon" onClick={pageBack} disabled={tokenId == "0x00"}>
                        <Image src="/arrow-left.svg" width={24} height={24} alt="back" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={pageForward} disabled={tokenId == currentTokenId}>
                        <Image src="/arrow-right.svg" width={24} height={24} alt="back" />
                    </Button>
                </div>

                <h1>Collective Noun #{parseInt(tokenId, 16)}</h1>

                <CurrentAuction
                    auctionInfo={auctionInfo}
                    contractInfo={contractInfo}
                    tokenId={currentTokenId}
                    hidden={tokenId != currentTokenId}
                    revalidateAuctionInfo={async () => {
                        await mutateCurrentAuctionInfo();
                        await mutateTokenInfo();
                        return;
                    }}
                />
                <EndedAuction
                    auctionContract={contractInfo?.auction}
                    tokenId={tokenId}
                    owner={tokenInfo?.owner}
                    hidden={tokenId == currentTokenId}
                />
            </div>
        </div>
    );
}

const EndedAuction = ({
    auctionContract,
    tokenId,
    owner,
    hidden,
}: {
    auctionContract?: string;
    tokenId?: string;
    owner?: `0x${string}`;
    hidden: boolean;
}) => {
    const { data } = usePreviousAuctions({ auctionContract });
    const auctionData = data?.find((auction) => compareAddress(auction.tokenId, tokenId || ""));

    const ensName = useEnsName(owner);

    return (
        <div className={clsx("flex flex-col md:flex-row md:flex-wrap justify-start w-full gap-4", hidden && "hidden")}>
            <div className="flex flex-col gap-2 shrink-0 min-w-[165px] md:pr-6">
                <div className="font-light">Winning Bid</div>
                <h3>{auctionData ? `Ξ ${formatNumber(utils.formatEther(auctionData.amount || "0"), 3)}` : "n/a"}</h3>
            </div>
            <div className="flex flex-col gap-2">
                <div className="font-light">Held by</div>
                <div className="flex items-center gap-2">
                    <UserAvatar
                        diameter={44}
                        className="w-[44px] h-[44px] rounded-full"
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
    hidden,
    revalidateAuctionInfo,
}: {
    auctionInfo?: AuctionInfo;
    contractInfo?: ContractInfo;
    tokenId: string;
    hidden: boolean;
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
        <div className={clsx("flex flex-col w-full gap-4", hidden && "hidden")}>
            <div className="flex flex-row flex-wrap md:justify-start w-full gap-4 ">
                <div className="flex flex-col gap-2 md:pr-6 shrink-0 min-w-[165px]">
                    <div className="font-light">{auctionOver ? "Winning Bid" : "Current Bid"}</div>
                    <h3>Ξ {formatNumber(utils.formatEther(auctionInfo?.highestBid || "0"), 3)}</h3>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="font-light">{auctionOver ? "Winner" : "Auction ends in"}</div>
                    {auctionOver ? (
                        <div className="flex items-center gap-2">
                            <UserAvatar
                                address={auctionInfo?.highestBidder ?? zeroAddress}
                                diameter={44}
                                className="w-[44px] h-[44px]"
                            />
                            <h3>
                                {ensName || shortenAddress(auctionInfo?.highestBidder || ethers.constants.AddressZero)}
                            </h3>
                        </div>
                    ) : (
                        <CountdownDisplay to={auctionInfo?.endTime || "0"} />
                    )}
                </div>
            </div>

            <SettleAuction auction={contractInfo?.auction} hidden={!auctionOver} onSettled={revalidateAuctionInfo} />
            <PlaceBid
                highestBid={auctionInfo?.highestBid || "0"}
                auction={contractInfo?.auction}
                tokenId={tokenId}
                hidden={auctionOver}
                onNewBid={revalidateAuctionInfo}
            />

            {!auctionOver &&
                auctionInfo?.highestBidder &&
                !compareAddress(auctionInfo?.highestBidder, ethers.constants.AddressZero) && (
                    <HighestBidder address={auctionInfo?.highestBidder} />
                )}
        </div>
    );
};

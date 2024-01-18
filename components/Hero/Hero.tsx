import { BigNumber, ethers, utils } from "ethers";
import Image from "next/image";
import { CountdownDisplay } from "../CountdownDisplay";
import { useCurrentAuctionInfo, useContractInfo, useTokenInfo } from "hooks";
import { compareAddress } from "@/utils/compareAddress";
import { SettleAuction } from "./SettleAuction";
import { PlaceBid } from "./PlaceBid";
import { HighestBidder } from "./HighestBidder";
import { Fragment, useMemo, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { AuctionInfo } from "@/services/nouns-builder/auction";
import { ContractInfo } from "@/services/nouns-builder/token";
import { usePreviousAuctions } from "@/hooks/fetch/usePreviousAuctions";
import { useEnsName } from "wagmi";
import { shortenAddress } from "@/utils/shortenAddress";
import UserAvatar from "../UserAvatar";
import { useRouter } from "next/router";
import Button from "../Button";

export default function Hero() {
    const { data: contractInfo } = useContractInfo();
    const { data: auctionInfo } = useCurrentAuctionInfo({
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

    console.log(tokenInfo?.image);

    return (
        <div className="bg-transparent max-w-[374px] md:max-w-[500px] lg:max-w-5xl flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-start py-[48px] md:py-[64px] gap-8 md:gap-16 px-4 md:px-10">
            <div className="h-[342px] w-[342px] md:w-[420px] md:h-[420px] relative shrink-0">
                {tokenInfo && (
                    <Image
                        src={tokenInfo.image}
                        onLoad={() => setImageLoaded(true)}
                        fill={true}
                        alt="logo"
                        className="rounded-[64px] border-[3px] border-transparent/10"
                    />
                )}
                <div
                    className={`absolute top-0 right-0 h-[342px] w-[342px] md:w-[450px] md:h-[450px] hidden lg:flex items-center justify-around lg:pr-12 ${
                        imageLoaded ? "invisible" : "visible"
                    }`}
                >
                    <Image src={"/spinner.svg"} alt="spinner" width={30} height={30} />
                </div>
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

                <h1>{tokenInfo?.name || "---"}</h1>

                {tokenId === currentTokenId ? (
                    <CurrentAuction auctionInfo={auctionInfo} contractInfo={contractInfo} tokenId={currentTokenId} />
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

    const { data: ensName } = useEnsName({
        address: owner,
        chainId: 1,
    });

    return (
        <div className="flex flex-row justify-start w-full gap-12">
            <div className="flex flex-col gap-2">
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
}: {
    auctionInfo?: AuctionInfo;
    contractInfo?: ContractInfo;
    tokenId: string;
}) => {
    const auctionOver = (auctionInfo?.endTime || 0) < Math.round(Date.now() / 1000);

    const { data: ensName } = useEnsName({
        address: auctionInfo?.highestBidder,
        chainId: 1,
    });

    return (
        <Fragment>
            <div className="flex flex-row justify-start w-full gap-12">
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

            {(auctionInfo?.endTime || 0) < Math.round(Date.now() / 1000) ? (
                <SettleAuction auction={contractInfo?.auction} />
            ) : (
                <PlaceBid
                    highestBid={auctionInfo?.highestBid || "0"}
                    auction={contractInfo?.auction}
                    tokenId={tokenId}
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

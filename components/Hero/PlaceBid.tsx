import { BigNumber, utils } from "ethers";
import Image from "next/image";
import { Fragment, useState } from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount, Address } from "wagmi";
import { AuctionABI } from "@buildersdk/sdk";
import { useDebounce } from "@/hooks/useDebounce";
import { useTheme } from "@/hooks/useTheme";
import Button from "../Button";
import clsx from "clsx";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { track } from "@vercel/analytics";

export const PlaceBid = ({
    highestBid,
    auction,
    tokenId,
    onNewBid,
}: {
    highestBid?: string;
    auction?: string;
    tokenId?: string;
    onNewBid: () => void;
}) => {
    const { isConnected } = useAccount();
    const [bid, setBid] = useState("");
    const debouncedBid = useDebounce(bid, 500);

    const { openConnectModal } = useConnectModal();

    const { config, error } = usePrepareContractWrite({
        address: auction as Address,
        abi: AuctionABI,
        functionName: "createBid",
        args: [BigNumber.from(tokenId || 1)],
        overrides: {
            value: utils.parseEther(debouncedBid || "0"),
        },
        enabled: !!auction && !!debouncedBid,
    });
    const { write, data } = useContractWrite(config);
    const { isLoading } = useWaitForTransaction({
        hash: data?.hash,
        onError: () => {
            track("placeBidError");
        },
        onSuccess: () => {
            track("placeBidSuccess");
            setBid("");
            onNewBid();
        },
    });

    const highestBidBN = BigNumber.from(highestBid);
    const amountIncrease = highestBidBN.div("10");
    const nextBidAmount = highestBidBN.add(amountIncrease);

    const getError = () => {
        const reason = (error as any)?.reason;
        if (!reason) return "";

        if (reason.includes("insufficient funds")) return "Error insufficient funds for bid";

        if (debouncedBid && debouncedBid < utils.formatEther(nextBidAmount)) return "Error invalid bid";
    };

    return (
        <div className="flex flex-row flex-wrap gap-4 items-start">
            <div className="shrink">
                <input
                    value={bid}
                    type="number"
                    onChange={(e) => setBid(e.target.value)}
                    className={clsx(
                        "bg-primary h-[59px] rounded-[18px] px-6 py-4 focus:border-accent border-2 outline-none",
                        getError() != undefined && getError() != "" && "border-negative"
                    )}
                    placeholder={nextBidAmount ? `Ξ ${utils.formatEther(nextBidAmount)} or more` : ""}
                />
                {error && <p className=" text-negative">{getError()}</p>}
            </div>
            <Button
                disabled={(!write || isLoading) && isConnected}
                onClick={(e) => {
                    e.preventDefault();
                    if (isConnected) {
                        track("placeBidTriggered");
                        write?.();
                    } else {
                        openConnectModal?.();
                    }
                }}
            >
                {isLoading ? <Image src="/spinner.svg" height={24} width={24} alt="spinner" /> : "Place bid"}
            </Button>
        </div>
    );
};

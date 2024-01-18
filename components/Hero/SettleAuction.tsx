import Image from "next/image";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, Address, useAccount } from "wagmi";
import { AuctionABI } from "@buildersdk/sdk";
import Button from "../Button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { track } from "@vercel/analytics";

export const SettleAuction = ({ auction, onSettled }: { auction?: string; onSettled: () => Promise<void> }) => {
    const { config } = usePrepareContractWrite({
        address: auction as Address,
        abi: AuctionABI,
        functionName: "settleCurrentAndCreateNewAuction",
        enabled: !!auction,
    });
    const { write, data, isLoading: contractLoading } = useContractWrite(config);
    const { isLoading: transactionLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onError: () => {
            track("settleAuctionError");
        },
        onSuccess: () => {
            track("settleAuctionSuccess");
            onSettled().then(() => router.push("/"));
            // ;
        },
        confirmations: 4,
    });
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const router = useRouter();

    const isLoading = contractLoading || transactionLoading;

    return (
        <Button
            onClick={async () => {
                if (isConnected) {
                    track("settleAuctionTriggered");
                    write?.();
                } else {
                    openConnectModal?.();
                }
            }}
            disabled={isLoading}
        >
            {isLoading ? <Image src="/spinner.svg" height={26} width={26} alt="spinner" /> : "Settle Auction"}
        </Button>
    );
};

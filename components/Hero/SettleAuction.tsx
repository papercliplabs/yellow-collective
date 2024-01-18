import Image from "next/image";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, Address, useAccount } from "wagmi";
import { AuctionABI } from "@buildersdk/sdk";
import Button from "../Button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

export const SettleAuction = ({ auction, onSettled }: { auction?: string; onSettled: () => void }) => {
    const { config } = usePrepareContractWrite({
        address: auction as Address,
        abi: AuctionABI,
        functionName: "settleCurrentAndCreateNewAuction",
        enabled: !!auction,
    });
    const { write, data, isLoading: contractLoading } = useContractWrite(config);
    const { isLoading: transactionLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess: () => {
            onSettled();
            router.push("/");
        },
    });
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const router = useRouter();

    const isLoading = contractLoading || transactionLoading;

    return (
        <Button
            onClick={async () => {
                if (isConnected) {
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

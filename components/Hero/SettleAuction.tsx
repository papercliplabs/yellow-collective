import Image from "next/image";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, Address } from "wagmi";
import { AuctionABI } from "@buildersdk/sdk";
import Button from "../Button";

export const SettleAuction = ({ auction }: { auction?: string }) => {
    const { config } = usePrepareContractWrite({
        address: auction as Address,
        abi: AuctionABI,
        functionName: "settleCurrentAndCreateNewAuction",
        enabled: !!auction,
    });
    const { write, data, isLoading: contractLoading } = useContractWrite(config);
    const { isLoading: transactionLoading } = useWaitForTransaction({
        hash: data?.hash,
    });

    const isLoading = contractLoading || transactionLoading;

    return (
        <Button onClick={() => write?.()}>
            {isLoading ? (
                <Image src="/spinner.svg" height={26} width={26} alt="spinner" />
            ) : (
                <span>Settle Auction</span>
            )}
        </Button>
    );
};

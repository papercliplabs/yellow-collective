import { Fragment } from "react";
import { useEnsName } from "wagmi";
import { useTheme } from "@/hooks/useTheme";
import { shortenAddress } from "@/utils/shortenAddress";
import UserAvatar from "../UserAvatar";

export const HighestBidder = ({ address }: { address?: `0x${string}` }) => {
    const { data: ensName } = useEnsName({ address });

    if (!address) return <Fragment />;

    return (
        <div className="flex flex-row gap-4 items-center text-secondary">
            <div>Highest Bidder</div>

            <div className="flex items-center">
                <div className="flex items-center">
                    <UserAvatar className="h-6 rounded-full mr-2" address={address} />
                    <div className="font-semibold">{ensName || shortenAddress(address)}</div>
                </div>
            </div>
        </div>
    );
};

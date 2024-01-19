import { Fragment } from "react";
import { useTheme } from "@/hooks/useTheme";
import { shortenAddress } from "@/utils/shortenAddress";
import UserAvatar from "../UserAvatar";
import useEnsName from "@/hooks/useEnsName";

export const HighestBidder = ({ address }: { address?: `0x${string}` }) => {
    const ensName = useEnsName(address);

    if (!address) return <Fragment />;

    return (
        <div className="flex flex-row gap-4 items-center text-secondary">
            <div>Highest Bidder</div>

            <div className="flex items-center">
                <div className="flex items-center">
                    <UserAvatar className="w-[32px] h-[32px] rounded-full mr-2" diameter={32} address={address} />
                    <div className="font-semibold">{ensName || shortenAddress(address)}</div>
                </div>
            </div>
        </div>
    );
};

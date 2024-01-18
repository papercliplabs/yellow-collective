import { Address } from "wagmi";
import Image from "next/image";
import getNormalizedURI from "@/utils/getNormalizedURI";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { IPFS_GATEWAY } from "constants/urls";
import useEnsAvatar from "@/hooks/useEnsAvatar";

export default function UserAvatar({
    address,
    className,
    diameter,
}: {
    address: Address;
    className: string;
    diameter?: number;
}) {
    const ensAvatar = useEnsAvatar(address);

    console.log(address, ensAvatar);

    if (!ensAvatar)
        return (
            <div className={className}>
                <Jazzicon diameter={diameter} seed={jsNumberForAddress(address)} />
            </div>
        );

    if (ensAvatar.includes("ipfs"))
        return (
            <Image
                src={getNormalizedURI(ensAvatar, {
                    preferredIPFSGateway: IPFS_GATEWAY,
                })}
                className={className}
                alt="avatar"
                height={20}
                width={20}
            />
        );

    return <img alt="avatar" src={ensAvatar} className={className} />;
}

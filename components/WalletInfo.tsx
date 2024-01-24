import useEnsWalletInfo from "@/hooks/fetch/useEnsName";
import { shortenAddress } from "@/utils/shortenAddress";
import { ethers } from "ethers";
import { Address } from "wagmi";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { getAddress, zeroAddress } from "viem";
import Image from "next/image";
import { useEffect, useState } from "react";
import useEnsName from "@/hooks/fetch/useEnsName";
import useEnsAvatar from "@/hooks/fetch/useEnsAvatar";

interface WalletInfoProps {
    address?: Address;
    hideAvatar?: boolean;
    hideAddress?: boolean;
    disableEns?: boolean;
    size: "sm" | "lg";
}

export default function WalletInfo({ address, hideAvatar, hideAddress, disableEns, size }: WalletInfoProps) {
    const { data: ensNameResp } = useEnsName(address);
    const { data: ensAvatarResp } = useEnsAvatar(address);
    const [ensImgError, setEnsImgError] = useState<boolean>(false);

    useEffect(() => {
        setEnsImgError(false);
    }, [address]);

    return (
        <div className="flex flex-row gap-2 items-center">
            {!hideAvatar &&
                (!disableEns && ensAvatarResp?.ensAvatar && !ensImgError ? (
                    <Image
                        src={ensAvatarResp.ensAvatar}
                        alt="avatar"
                        height={size == "sm" ? 24 : 44}
                        width={size == "sm" ? 24 : 44}
                        className="rounded-full"
                        onError={() => setEnsImgError(true)}
                    />
                ) : (
                    <Jazzicon diameter={size == "sm" ? 24 : 44} seed={jsNumberForAddress(address ?? zeroAddress)} />
                ))}
            {!hideAddress &&
                (size == "sm" ? (
                    <h6>
                        {!disableEns && ensNameResp?.ensName
                            ? ensNameResp.ensName
                            : shortenAddress(address ? getAddress(address) : ethers.constants.AddressZero, 4)}
                    </h6>
                ) : (
                    <h3>
                        {!disableEns && ensNameResp?.ensName
                            ? ensNameResp.ensName
                            : shortenAddress(address ? getAddress(address) : ethers.constants.AddressZero, 4)}
                    </h3>
                ))}
        </div>
    );
}

import useEnsWalletInfo from "@/hooks/fetch/useEnsName";
import { shortenAddress } from "@/utils/shortenAddress";
import { ethers } from "ethers";
import { Address } from "wagmi";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { getAddress, zeroAddress } from "viem";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import useEnsName from "@/hooks/fetch/useEnsName";
import useEnsAvatar from "@/hooks/fetch/useEnsAvatar";
import clsx from "clsx";

interface WalletInfoProps {
  address?: Address;
  hideAvatar?: boolean;
  hideAddress?: boolean;
  disableEns?: boolean;
  size: "sm" | "lg";
}

export default function WalletInfo({
  address,
  hideAvatar,
  hideAddress,
  disableEns,
  size,
}: WalletInfoProps) {
  const { data: ensNameResp } = useEnsName(address);
  const { data: ensAvatarResp } = useEnsAvatar(address);
  const [ensImgError, setEnsImgError] = useState<boolean>(false);

  useEffect(() => {
    setEnsImgError(false);
  }, [address]);

  const name = useMemo(() => {
    if (!disableEns && ensNameResp?.ensName) {
      const name = ensNameResp.ensName;
      if (name.includes("⌐◨-◨")) {
        // NNS
        const split = name.split(".");
        return (
          <>
            {split[0]}.
            <span
              className={clsx(
                "font-nns",
                size == "sm" ? " text-[14px]" : "text-[24px]"
              )}
            >
              {split[1]}
            </span>
          </>
        );
      } else {
        return name;
      }
    } else {
      return shortenAddress(
        address ? getAddress(address) : ethers.constants.AddressZero,
        4
      );
    }
  }, [address, ensNameResp, size]);

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
          <Jazzicon
            diameter={size == "sm" ? 24 : 44}
            seed={jsNumberForAddress(address ?? zeroAddress)}
          />
        ))}
      {!hideAddress && (size == "sm" ? <h6>{name}</h6> : <h3>{name}</h3>)}
    </div>
  );
}

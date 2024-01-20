import useEnsName from "@/hooks/useEnsName";
import { shortenAddress } from "@/utils/shortenAddress";
import { ethers } from "ethers";
import { Address } from "wagmi";

export default function UserName({ address }: { address?: Address }) {
    const ensName = useEnsName(address);

    return <>{ensName ?? shortenAddress(address || ethers.constants.AddressZero, 4)}</>;
}

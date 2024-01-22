import { EnsInfo } from "data/ens";
import useSWR from "swr";
import { Address } from "viem";

export default function useEnsWalletInfo(address?: Address) {
    return useSWR<EnsInfo>(address ? `/api/ens/${address}` : undefined);
}

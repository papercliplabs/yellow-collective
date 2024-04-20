import { GetEnsAvatarReturnType } from "@/services/ens";
import useSWR from "swr";
import { Address } from "viem";

export default function useEnsAvatar(address?: Address) {
  return useSWR<GetEnsAvatarReturnType>(
    address ? `/api/ens/avatar/${address}` : undefined
  );
}

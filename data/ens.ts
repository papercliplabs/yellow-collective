import { viemMainnetClient } from "configs/wallet";
import { Address } from "viem";

export interface EnsInfo {
    ensName?: string;
    ensAvatar?: string;
}

export async function getEnsInfo({ address }: { address: Address }): Promise<EnsInfo> {
    const ensName = (await viemMainnetClient.getEnsName({ address })) ?? undefined;
    const ensAvatar = ensName ? (await viemMainnetClient.getEnsAvatar({ name: ensName })) ?? undefined : undefined;

    return { ensName, ensAvatar };
}

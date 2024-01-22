import { viemMainnetClient } from "configs/wallet";
import { Address } from "viem";

export interface GetEnsNameReturnType {
    ensName?: string;
}

export async function getEnsName({ address }: { address: Address }): Promise<GetEnsNameReturnType> {
    const ensName = (await viemMainnetClient.getEnsName({ address })) ?? undefined;

    return { ensName: ensName };
}

export interface GetEnsAvatarReturnType {
    ensAvatar?: string;
}

export async function getEnsAvatar({ address }: { address: Address }): Promise<GetEnsAvatarReturnType> {
    const ensNameResp = await getEnsName({ address });
    const ensAvatar = ensNameResp.ensName
        ? (await viemMainnetClient.getEnsAvatar({ name: ensNameResp.ensName })) ?? undefined
        : undefined;

    return { ensAvatar: ensAvatar };
}

import { viemMainnetClient } from "configs/wallet";
import { Address, hexToString, slice } from "viem";

export interface GetEnsNameReturnType {
  ensName?: string;
}

export async function getEnsName({
  address,
}: {
  address: Address;
}): Promise<GetEnsNameReturnType> {
  // Get NNS or ENS name
  try {
    const res = await viemMainnetClient.call({
      to: "0x849f92178950f6254db5d16d1ba265e70521ac1b",
      data: `0x55ea6c47000000000000000000000000${address.substring(2)}`,
    });

    let name = undefined;
    if (res?.data) {
      const offset = Number(slice(res.data, 0, 32));
      const length = Number(slice(res.data, offset, offset + 32));
      const data = slice(res.data, offset + 32, offset + 32 + length);

      name = hexToString(data);
    }

    return { ensName: name };
  } catch (e) {
    return { ensName: undefined };
  }
}

export interface GetEnsAvatarReturnType {
  ensAvatar?: string;
}

export async function getEnsAvatar({
  address,
}: {
  address: Address;
}): Promise<GetEnsAvatarReturnType> {
  const ensName = await viemMainnetClient.getEnsName({ address });
  const ensAvatar = ensName
    ? (await viemMainnetClient.getEnsAvatar({ name: ensName })) ?? undefined
    : undefined;

  return { ensAvatar: ensAvatar };
}

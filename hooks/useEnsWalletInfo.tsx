import getNormalizedURI from "@/utils/getNormalizedURI";
import { viemMainnetClient } from "configs/wallet";
import { IPFS_GATEWAY } from "constants/urls";
import { useEffect, useState } from "react";
import { Address } from "wagmi";

interface UseEnsWalletInfoReturnType {
    ensName?: string;
    ensAvatar?: string;
}

export default function useEnsWalletInfo(address?: Address, disable?: boolean): UseEnsWalletInfoReturnType {
    const [ensName, setEnsName] = useState<string | undefined>(undefined);
    const [ensAvatar, setEnsAvatar] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function fetch() {
            setEnsName(undefined);
            setEnsAvatar(undefined);

            if (address != undefined && !disable) {
                const name = await viemMainnetClient.getEnsName({ address });
                setEnsName(name ?? undefined);

                if (name != null) {
                    let avatar = await viemMainnetClient.getEnsAvatar({ name });
                    if (avatar?.includes("ipfs")) {
                        avatar = getNormalizedURI(avatar, {
                            preferredIPFSGateway: IPFS_GATEWAY,
                        });
                    }

                    setEnsAvatar(avatar ?? undefined);
                }
            }
        }

        fetch();
    }, [address]);

    return { ensName, ensAvatar };
}

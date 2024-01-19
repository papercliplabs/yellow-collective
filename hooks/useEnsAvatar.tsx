import { viemMainnetClient } from "configs/wallet";
import { useEffect, useState } from "react";
import { Address } from "wagmi";
import useEnsName from "./useEnsName";

export default function useEnsAvatar(address?: Address): string | undefined {
    const [ensAvatar, setEnsAvatar] = useState<string | undefined>(undefined);
    const ensName = useEnsName(address);

    useEffect(() => {
        let isCancelled = false;
        async function fetch() {
            if (ensName && address) {
                setEnsAvatar(undefined);
                const avatar = await viemMainnetClient.getEnsAvatar({ name: ensName });
                if (!isCancelled) {
                    setEnsAvatar(avatar ?? undefined);
                }
            } else {
                setEnsAvatar(undefined);
            }
        }

        fetch();

        return () => {
            isCancelled = true;
        };
    }, [address, ensName]);

    return ensName && address ? ensAvatar : undefined;
}

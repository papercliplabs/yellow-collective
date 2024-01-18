import { viemMainnetClient } from "configs/wallet";
import { useEffect, useState } from "react";
import { Address } from "wagmi";
import useEnsName from "./useEnsName";

export default function useEnsAvatar(address?: Address): string | undefined {
    const [ensAvatar, setEnsAvatar] = useState<string | undefined>(undefined);
    const ensName = useEnsName(address);

    useEffect(() => {
        async function fetch() {
            if (ensName && address) {
                setEnsAvatar(undefined);
                const avatar = await viemMainnetClient.getEnsAvatar({ name: ensName });
                setEnsAvatar(avatar ?? undefined);
            } else {
                setEnsAvatar(undefined);
            }
        }

        fetch();
    }, [ensName, address]);

    console.log(ensName, address);

    return ensAvatar;
}

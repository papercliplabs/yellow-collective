import { viemMainnetClient } from "configs/wallet";
import { useEffect, useState } from "react";
import { Address } from "wagmi";

export default function useEnsName(address?: Address): string | undefined {
    const [ensName, setEnsName] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function fetch() {
            if (address) {
                setEnsName(undefined);
                const ensName = await viemMainnetClient.getEnsName({ address });
                setEnsName(ensName ?? undefined);
            } else {
                setEnsName(undefined);
            }
        }

        fetch();
    }, [address]);

    return ensName;
}

import { BigNumber } from "ethers";
import useSWR from "swr";

export const useNounsBalance = ({
  user
}: {
  user?: string;
}) => {
  return useSWR<BigNumber>(
    user ? `/api/nouns/balance/${user}` : undefined
  );
};

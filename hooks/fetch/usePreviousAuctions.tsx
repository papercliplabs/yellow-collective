import useSWR from "swr";
import { PreviousAuction } from "@/services/nouns-builder/auction";
import { TOKEN_CONTRACT } from "constants/addresses";

export const usePreviousAuction = ({
  tokenId,
}: {
  auctionContract?: string;
  tokenId: string;
}) => {
  return useSWR<PreviousAuction>(
    `/api/auction/${TOKEN_CONTRACT}/previous/${tokenId}`
  );
};

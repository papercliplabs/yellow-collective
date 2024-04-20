import { BuilderSDK } from "@buildersdk/sdk";
import DefaultProvider from "@/utils/DefaultProvider";
import { request } from "graphql-request";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { parse } from "graphql";
import { GraphQLClient, gql } from "graphql-request";
import { TOKEN_CONTRACT } from "constants/addresses";
import { BigNumber } from "ethers";
import { Address } from "wagmi";
import { SUBGRAPH_ENDPOINT } from "constants/urls";
import { zeroAddress } from "viem";

export type Bid = {
  bidder: Address;
  bidAmount: string;
  transactionHash: string;
};

export type AuctionInfo = {
  tokenId: string;
  highestBid: string;
  highestBidder: `0x${string}`;
  startTime: number;
  endTime: number;
  settled: boolean;
  bids: Bid[];
};

export type PreviousAuction = {
  tokenId: string;
  winner: `0x${string}`;
  amount: string;
  bids: Bid[];
};

const { auction } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export const getCurrentAuction = async ({ address }: { address: string }) => {
  const { tokenId, highestBid, highestBidder, startTime, endTime, settled } =
    await auction({
      address,
    }).auction();

  const bids = await getBidHistory({ tokenId });

  return {
    tokenId: tokenId.toHexString(),
    highestBid: highestBid.toHexString(),
    highestBidder,
    startTime,
    endTime,
    settled,
    bids,
  } as AuctionInfo;
};

export const getPreviousAuction = async ({
  address,
  tokenId,
}: {
  address: string;
  tokenId: string;
}) => {
  const query: TypedDocumentNode<
    { auction?: { winningBid?: { amount: string; bidder: string } } },
    { id: string }
  > = parse(gql`
    query previousAuction($id: ID!) {
      auction(id: $id) {
        winningBid {
          amount
          bidder
        }
      }
    }
  `);

  const client = new GraphQLClient(SUBGRAPH_ENDPOINT);
  const id = `${address.toLowerCase()}:${Number(tokenId)}`;

  const auctionResp = await client.request({
    document: query,
    variables: { id },
  });
  const bids = await getBidHistory({ tokenId: BigNumber.from(tokenId) });

  return auctionResp.auction
    ? ({
        tokenId,
        winner: auctionResp.auction?.winningBid?.bidder ?? zeroAddress,
        amount: auctionResp.auction?.winningBid?.amount ?? "0",
        bids,
      } as PreviousAuction)
    : undefined;
};

export async function getBidHistory({ tokenId }: { tokenId: BigNumber }) {
  const query: TypedDocumentNode<
    { auction?: { bids: { id: string; bidder: string; amount: string }[] } },
    { id: string }
  > = parse(gql`
    query auctionBids($id: ID!) {
      auction(id: $id) {
        bids(orderBy: bidTime, orderDirection: desc) {
          id
          bidder
          amount
        }
      }
    }
  `);

  const client = new GraphQLClient(SUBGRAPH_ENDPOINT);
  const id = `${TOKEN_CONTRACT.toLowerCase()}:${tokenId}`;
  const resp = await client.request({ document: query, variables: { id } });

  return (
    resp.auction?.bids.map(
      (entry) =>
        ({
          bidder: entry.bidder,
          bidAmount: entry.amount,
          transactionHash: entry.id.split(":")[0],
        }) as Bid
    ) ?? []
  );
}

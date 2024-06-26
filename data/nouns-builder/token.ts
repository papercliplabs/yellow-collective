import { BuilderSDK } from "@buildersdk/sdk";
import DefaultProvider from "@/utils/DefaultProvider";
import parseBase64String from "@/utils/parseBase64String";
import getNormalizedURI from "@/utils/getNormalizedURI";
import { BigNumber, BigNumberish, constants } from "ethers";
import { IPFS_GATEWAY, SUBGRAPH_ENDPOINT } from "constants/urls";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { parse } from "graphql";
import { GraphQLClient, gql } from "graphql-request";
import { TOKEN_CONTRACT } from "constants/addresses";

const { token } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export type ContractInfo = {
  name: string;
  description?: string;
  image: string;
  external_url?: string;
  total_supply: string;
  auction: string;
};

export type TokenInfo = {
  name: string;
  image: string;
  countryName: string;
  owner: `0x${string}`;
};

export type Founder = {
  wallet: `0x${string}`;
  ownershipPct: number;
  vestExpiry: number;
};

export const getContractInfo = async ({ address }: { address: string }) => {
  const tokenContract = token({
    address: address as string,
  });

  const [contractURI, total_supply, auction] = await Promise.all([
    tokenContract.contractURI(),
    tokenContract.totalSupply(),
    tokenContract.auction(),
  ]);

  const contractJSON = parseBase64String(contractURI);

  return {
    ...contractJSON,
    image: getNormalizedURI(contractJSON.image, {
      preferredIPFSGateway: IPFS_GATEWAY,
    }),
    total_supply: total_supply.toHexString(),
    auction,
  } as ContractInfo;
};

export const getTokenInfo = async ({
  address,
  tokenid,
}: {
  address: string;
  tokenid: string;
}) => {
  const query: TypedDocumentNode<
    { token?: { image: string; name: string; owner: string } },
    { id: string }
  > = parse(gql`
    query tokenInfo($id: ID!) {
      token(id: $id) {
        image
        name
        owner
      }
    }
  `);

  const client = new GraphQLClient(SUBGRAPH_ENDPOINT);
  const id = `${TOKEN_CONTRACT.toLowerCase()}:${parseInt(tokenid, 16)}`;
  const resp = await client.request({ document: query, variables: { id } });
  const token = resp?.token;

  if (!token) {
    console.error("getTokenInfo, subgraph error", tokenid);
  }

  // Parse the country out of the image URL
  const imageName = token?.image || "";
  const startIndex = imageName.indexOf("kits%2f") + 7;
  const imageSubstring = imageName.substring(startIndex);
  const endIndex = imageSubstring.indexOf(".png&");
  const finalImageSubstring = imageSubstring.substring(0, endIndex);

  let countryName = finalImageSubstring.charAt(0).toUpperCase() + finalImageSubstring.slice(1);
    if (countryName.endsWith('-2') || countryName.endsWith('-3')) {
      countryName = countryName.slice(0, -2);
    }

    console.log(token?.image, countryName)

  return {
    name: token?.name,
    image: token?.image,
    countryName,
    owner: token?.owner,
  } as TokenInfo;
};

export const getFounder = async ({
  address,
  founderId,
}: {
  address: string;
  founderId: string;
}) => {
  const tokenContract = token({
    address: address as string,
  });

  const { wallet, ownershipPct, vestExpiry } = await tokenContract.getFounder(
    BigNumber.from(founderId)
  );
  return { wallet, ownershipPct, vestExpiry } as Founder;
};

export const getBalanceOf = async ({
  address,
  user,
}: {
  address: `0x${string}`;
  user: `0x${string}`;
}) => {
  const tokenContract = token({
    address,
  });

  return await tokenContract.balanceOf(user);
};

export const getUserVotes = async ({
  address,
  user,
  timestamp,
}: {
  address: `0x${string}`;
  user: `0x${string}`;
  timestamp?: string;
}) => {
  const tokenContract = token({
    address,
  });

  return timestamp
    ? tokenContract.getPastVotes(user, BigNumber.from(timestamp))
    : tokenContract.getVotes(user);
};

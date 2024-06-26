import Header from "../components/Header";
import { useIsMounted } from "hooks/useIsMounted";
import Hero from "../components/Hero/Hero";
import { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { SWRConfig } from "swr";
import {
  ContractInfo,
  getContractInfo,
  getTokenInfo,
  TokenInfo,
} from "data/nouns-builder/token";
import { AuctionInfo, getCurrentAuction } from "data/nouns-builder/auction";
import Footer from "@/components/Footer";
import { getAddresses } from "@/services/nouns-builder/manager";
import Faq from "@/components/Faq";
import Description from "@/components/Description";
import Head from "next/head";

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{
    tokenContract: string;
    tokenId: string;
    contract: ContractInfo;
    token: TokenInfo;
    auction: AuctionInfo;

  }>
> => {
  // Get token and auction info
  const tokenContract = process.env
    .NEXT_PUBLIC_TOKEN_CONTRACT! as `0x${string}`;

  const [addresses, contract] = await Promise.all([
    getAddresses({ tokenAddress: tokenContract }),
    getContractInfo({ address: tokenContract }),
  ]);

  const auction = await getCurrentAuction({ address: addresses.auction });
  const tokenId = auction.tokenId;
  const token = await getTokenInfo({
    address: tokenContract,
    tokenid: tokenId,
  });

  if (!contract.image) contract.image = "";


  if (token.name === undefined) {
    token.name = ""; // or a default value
  }

  if (token.image === undefined) {
    token.image = ""; // or a default value
  }

  if (token.owner === undefined) {
    token.owner = `0x0000000000000000000000000000000000000000`; // or a default value
  }

  return {
    props: {
      tokenContract,
      tokenId,
      contract,
      token,
      auction,
    },
    revalidate: 60,
  };
};

export default function SiteComponent({
  tokenContract,
  tokenId,
  contract,
  token,
  auction,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isMounted = useIsMounted();

  return (
    <SWRConfig
      value={{
        fallback: {
          [`/api/token/${tokenContract}`]: contract,
          [`/api/token/${tokenContract}/${tokenId}`]: token,
          [`/api/auction/${contract.auction}`]: auction,
        },
      }}
    >
      {isMounted && (
        <div
          className="min-h-screen flex flex-col items-center justify-start w-screen"
          style={{
            color: "var(--brand-text-main)",
            }}
        >
          <Header />
          <Hero  />
          <Description />
          <Faq />
          <Footer />
        </div>
      )}
    </SWRConfig>
  );
}

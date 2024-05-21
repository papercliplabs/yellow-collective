import Header from "../components/Header";
import { useIsMounted } from "hooks/useIsMounted";
import { Fragment } from "react";
import Hero from "../components/Hero/Hero";
import { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
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
import Banner from "@/components/Banner";
import Faq from "@/components/Faq";
import Description from "@/components/Description";
import Head from "next/head";
import { getFrameMetadata } from "@/utils/getFrameMetadata";

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{
    tokenContract: string;
    tokenId: string;
    contract: ContractInfo;
    token: TokenInfo;
    auction: AuctionInfo;
    frameTags: { property: string; content: string }[];
  }>
> => {
  // Get token and auction info
  const tokenContract = process.env
    .NEXT_PUBLIC_TOKEN_CONTRACT! as `0x${string}`;

  const [addresses, contract, frameMetadata] = await Promise.all([
    getAddresses({ tokenAddress: tokenContract }),
    getContractInfo({ address: tokenContract }),
    getFrameMetadata(
      `https://frames.paperclip.xyz/nounish-auction/v2/nouns-builder/yellow-collective`
    ),
  ]);

  const auction = await getCurrentAuction({ address: addresses.auction });
  const tokenId = auction.tokenId;
  const token = await getTokenInfo({
    address: tokenContract,
    tokenid: tokenId,
  });

  if (!contract.image) contract.image = "";

  // Only take fc:frame tags (not og image overrides)
  const filteredFrameMetadata = frameMetadata.filter((entry) =>
    entry.property.includes("fc:frame")
  );

  return {
    props: {
      tokenContract,
      tokenId,
      contract,
      token,
      auction,
      frameTags: filteredFrameMetadata,
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
  frameTags,
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
      <Head>
        {frameTags.map(({ property, content }, i) => (
          <meta property={property} content={content} key={i} />
        ))}
      </Head>
      {isMounted && (
        <div className="bg-accent min-h-screen flex flex-col items-center justify-start w-screen">
          <Banner />
          <Header />
          <Hero />
          <Description />
          <Faq />
          <Footer />
        </div>
      )}
    </SWRConfig>
  );
}

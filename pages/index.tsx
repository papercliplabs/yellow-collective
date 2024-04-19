import Header from "../components/Header";
import { useIsMounted } from "hooks/useIsMounted";
import { Fragment } from "react";
import Hero from "../components/Hero/Hero";
import { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { SWRConfig } from "swr";
import {
  ContractInfo,
  getContractInfo,
  getTokenInfo,
  TokenInfo,
} from "data/nouns-builder/token";
import { AuctionInfo, getCurrentAuction } from "data/nouns-builder/auction";
import { promises as fs } from "fs";
import path from "path";
import Footer from "@/components/Footer";
import FaqElement from "@/components/FaqElement";
import { getAddresses } from "@/services/nouns-builder/manager";
import Image from "next/image";
import Banner from "@/components/Banner";
import Faq from "@/components/Faq";
import Description from "@/components/Description";

type MarkdownSource = MDXRemoteSerializeResult<Record<string, unknown>>;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{
    tokenContract: string;
    tokenId: string;
    contract: ContractInfo;
    token: TokenInfo;
    auction: AuctionInfo;
    descriptionSource: MarkdownSource;
    faqSources: MarkdownSource[];
  }>
> => {
  // Get token and auction info
  const tokenContract = process.env
    .NEXT_PUBLIC_TOKEN_CONTRACT! as `0x${string}`;

  const addresses = await getAddresses({ tokenAddress: tokenContract });

  const [contract, auction] = await Promise.all([
    getContractInfo({ address: tokenContract }),
    getCurrentAuction({ address: addresses.auction }),
  ]);

  const tokenId = auction.tokenId;
  const token = await getTokenInfo({
    address: tokenContract,
    tokenid: tokenId,
  });

  // Get description and faq markdown

  const templateDirectory = path.join(process.cwd(), "templates");
  const descFile = await fs.readFile(
    templateDirectory + "/home/description.md",
    "utf8"
  );
  const descMD = await serialize(descFile);

  let faqSources: MarkdownSource[] = [];
  try {
    const faqFiles = await fs.readdir(templateDirectory + "/home/faq", {
      withFileTypes: true,
    });

    faqSources = await Promise.all(
      faqFiles
        .filter((dirent) => dirent.isFile())
        .map(async (file) => {
          const faqFile = await fs.readFile(
            templateDirectory + "/home/faq/" + file.name,
            "utf8"
          );

          return serialize(faqFile, { parseFrontmatter: true });
        })
    ).then((x) =>
      x.sort(
        (a, b) =>
          Number(a.frontmatter?.order || 0) - Number(b.frontmatter?.order || 0)
      )
    );
  } catch {
    //Do Nothing (no FAQ directory)
  }

  if (!contract.image) contract.image = "";

  return {
    props: {
      tokenContract,
      tokenId,
      contract,
      token,
      auction,
      descriptionSource: descMD,
      faqSources,
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
  descriptionSource,
  faqSources,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isMounted = useIsMounted();

  if (!isMounted) return <Fragment />;

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
      <div className="bg-accent min-h-screen flex flex-col items-center justify-start w-screen">
        <Banner />
        <Header />
        <Hero />
        <Description />
        <Faq />
        <Footer />
      </div>
    </SWRConfig>
  );
}

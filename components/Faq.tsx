import Header from "../components/Header";
import { useIsMounted } from "hooks/useIsMounted";
import { Fragment } from "react";
import Hero from "../components/Hero/Hero";
import { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { SWRConfig } from "swr";
import { ContractInfo, getContractInfo, getTokenInfo, TokenInfo } from "data/nouns-builder/token";
import { AuctionInfo, getCurrentAuction } from "data/nouns-builder/auction";
import { promises as fs } from "fs";
import path from "path";
import Footer from "@/components/Footer";
import FaqElement from "@/components/FaqElement";
import { getAddresses } from "@/services/nouns-builder/manager";
import Image from "next/image";
import Banner from "@/components/Banner";

interface FaqItem {
    title: string;
    content: string;
}

const faqItems: FaqItem[] = [
    { title: "test", content: "value" },
    { title: "test", content: "value" },
];

export default function Faq() {
    return (
        <div className="bg-white w-full flex justify-center pt-8">
            <div className="max-w-[720px] px-6 w-full flex flex-col gap-4 [&>p]:text-secondary">
                <h2>FAQs</h2>
                <div className="flex flex-col gap-4 w-full">
                    {faqItems.map((item, i) => (
                        <FaqElement title={item.title} key={i}>
                            {item.content}
                        </FaqElement>
                    ))}
                </div>
            </div>
        </div>
    );
}

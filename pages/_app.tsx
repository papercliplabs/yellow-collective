import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "../configs/wallet";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { SWRConfig } from "swr";
import { useInitTheme } from "@/hooks/useInitTheme";
import localFont from "next/font/local";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

export const pally = localFont({
  src: "../styles/Pally-Variable.ttf",
  display: "swap",
  variable: "--font-pally",
});

export const nns = localFont({
  src: "../styles/LondrinaSolid-NNS.ttf",
  display: "swap",
  variable: "--font-nns",
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  useInitTheme();

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Head>
            <meta property="og:title" content="Yellow Collective" />
            <meta
              property="og:description"
              content="A club on the BASE Ethereum L2 network, designed to support and empower artists and creatives in the Nouns and Superchain ecosystems"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://yellowcollective.xyz" />
            <meta
              property="og:image"
              content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/og-image.png`}
            />
          </Head>

          <main className={`${nns.variable} ${pally.variable}`}>
            <Component {...pageProps} />
            <Analytics />
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </SWRConfig>
  );
};
export default MyApp;

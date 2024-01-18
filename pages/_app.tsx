import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "../configs/wallet";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { SWRConfig } from "swr";
import { useInitTheme } from "@/hooks/useInitTheme";
import localFont from "@next/font/local";

const pally = localFont({
    src: "../styles/Pally-Variable.ttf",
    display: "swap",
    variable: "--font-pally",
});

const MyApp = ({ Component, pageProps }: AppProps) => {
    useInitTheme();

    return (
        <SWRConfig
            value={{
                fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
            }}
        >
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains}>
                    <main className={`${pally.variable}`}>
                        <Component {...pageProps} />
                    </main>
                </RainbowKitProvider>
            </WagmiConfig>
        </SWRConfig>
    );
};
export default MyApp;

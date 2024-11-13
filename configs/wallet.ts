import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { mainnet, goerli, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { zoraTestnet, zora, base, baseGoerli } from "@wagmi/chains";

import { createPublicClient, http } from "viem";
import { baseSepolia, mainnet as mainnetViem } from "viem/chains";

const selectedChain = {
  "1": mainnet,
  "5": goerli,
  "999": zoraTestnet,
  "7777777": zora,
  "8453": base,
  "84531": baseGoerli,
  "84532": baseSepolia,
}[process.env.NEXT_PUBLIC_TOKEN_NETWORK ?? "1"]!;

export const RPC_URLS: { [chainId: string]: string } = {
  "1": `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  "5": `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  "999": "https://testnet.rpc.zora.energy",
  "7777777": "https://rpc.zora.energy",
  "8453": `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  "84531": `https://base-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  "84532": `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
};

export const MAINNET_RPC_URL = RPC_URLS["1"];
export const RPC_URL = RPC_URLS[process.env.NEXT_PUBLIC_TOKEN_NETWORK ?? "1"]!;

export type ChainId =
  | "1"
  | "5"
  | "999"
  | "7777777"
  | "8453"
  | "84531"
  | "84532";

const { chains, provider } = configureChains(
  [selectedChain],
  [
    jsonRpcProvider({
      rpc: (_) => {
        return { http: RPC_URL };
      },
      stallTimeout: 1000,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Yellow Collective",
  chains,
  projectId: "afb449b5b1ea52d11db1ec72bc452500",
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const viemMainnetClient = createPublicClient({
  chain: mainnetViem,
  transport: http(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
  ),
});

export { wagmiClient, chains, viemMainnetClient };

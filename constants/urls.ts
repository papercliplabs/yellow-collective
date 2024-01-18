import { base, baseGoerli } from "@wagmi/chains";

export const ETHERSCAN_BASEURL = {
    "1": "https://etherscan.io",
    "5": "https://goerli.etherscan.io",
    "999": "https://explorer.zora.energy/",
    "7777777": "https://testnet.explorer.zora.energy/",
    "8453": base.blockExplorers.etherscan.url,
    "84531": baseGoerli.blockExplorers.etherscan.url,
}[process.env.NEXT_PUBLIC_TOKEN_NETWORK ?? "1"];

export const ETHER_ACTOR_BASEURL = "https://ether.actor";
export const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://gateway.pinata.cloud/ipfs/";

export const FARCASTER_URL = "https://warpcast.com/~/channel/yellow";

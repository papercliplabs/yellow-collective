import { MAINNET_RPC_URL } from "configs/wallet";
import { providers } from "ethers";

const provider = new providers.JsonRpcProvider(MAINNET_RPC_URL);

export default provider;

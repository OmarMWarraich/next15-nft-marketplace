import { defineChain } from "thirdweb/chains";

// Local Hardhat node used by this repo (see hardhat.config.ts).
const localRpcUrl =
  process.env.NEXT_PUBLIC_LOCAL_RPC_URL ?? "http://127.0.0.1:8545";

export const localChain = defineChain({
  id: 31337,
  name: "Local Hardhat",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpc: localRpcUrl,
  testnet: true,
});

import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { client } from "../lib/client";
import { localChain } from "../lib/chain";

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const ThirdwebConnect = () => {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      chain={localChain}
      autoConnect={{ timeout: 10000 }}
    />
  );
};

export default ThirdwebConnect;

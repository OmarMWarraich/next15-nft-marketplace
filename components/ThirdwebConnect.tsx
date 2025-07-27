import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const secretKey = process.env.THIRDWEB_SECRET_KEY;
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

const client = createThirdwebClient(
  secretKey && secretKey !== ""
    ? { secretKey, clientId }
    : { clientId: clientId as string }
);

const ThirdwebConnect = () => {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      autoConnect={{ timeout: 10000 }}
    />
  );
};

export default ThirdwebConnect;

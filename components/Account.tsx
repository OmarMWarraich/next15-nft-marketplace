"use client";

import { useAppKitAccount } from "@reown/appkit/react";

export const Account: React.FC = () => {
  const {
    isConnected,
    address,
    caipAddress,
    status,
    embeddedWalletInfo,
    allAccounts,
  } = useAppKitAccount();
  return (
    <div>
      <div>{isConnected ? "Connected" : "Not Connected"}</div>
      <div>{address}</div>
      <div>{caipAddress}</div>
      <div>{status}</div>
      <div>
        {embeddedWalletInfo
          ? JSON.stringify(embeddedWalletInfo)
          : "No Wallet Info"}
      </div>
      <div>
        {allAccounts.map((account, index) => (
          <div key={index}>{JSON.stringify(account)}</div>
        ))}
      </div>
    </div>
  );
};

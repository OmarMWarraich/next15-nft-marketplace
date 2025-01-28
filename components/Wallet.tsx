"use client";

import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { useAppKitAccount } from "@reown/appkit/react";
import React from "react";

export const Wallet: React.FC = () => {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();
  return (
    <div>
      <Button
        variant={isConnected ? "destructive" : "default"}
        className="mx-2 rounded-xl"
        onClick={() => open()}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
    </div>
  );
};

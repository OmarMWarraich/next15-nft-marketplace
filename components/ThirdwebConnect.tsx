"use client";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/client";

const ThirdwebConnect = () => <ConnectButton client={client} />;

export default ThirdwebConnect;

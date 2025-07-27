import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = process.env.THIRDWEB_SECRET_KEY ?? "";
if (!process.env.THIRDWEB_SECRET_KEY) {
  console.warn("Warning: THIRDWEB_SECRET_KEY environment variable is not set.");
}

if (!clientId && !secretKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID or THIRDWEB_SECRET_KEY environment variable."
  );
}

// If both secretKey and clientId are set, secretKey takes precedence.
// Adjust this logic if you want to enforce a different behavior.
export const client = createThirdwebClient(
  secretKey && secretKey !== ""
    ? { secretKey, clientId }
    : { clientId: clientId as string }
);

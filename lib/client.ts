import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!;
const secretKey = process.env.THIRDWEB_SECRET_KEY!;

// If both secretKey and clientId are set, secretKey takes precedence.
// Adjust this logic if you want to enforce a different behavior.
export const client = createThirdwebClient(
  secretKey !== undefined && secretKey !== "" ? { secretKey } : { clientId }
);

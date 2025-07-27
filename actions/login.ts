// Server actions for thirdweb ConnectButton auth prop
// Implement these to call your backend or handle session logic as needed
import { randomBytes } from "crypto";

export async function getLoginPayload(params: { address: string }) {
  // TODO: Implement server logic to generate login payload for address
  // Example usage of params to avoid unused variable error
  // Generate a unique nonce for this login attempt
  const nonce = randomBytes(16).toString("hex") + Date.now().toString(36);
  // In production, store the nonce in your database/session for later verification
  return { address: params.address, nonce };
}

export async function doLogin(_params: { payload: string; signature: string }) {
  // TODO: Implement server logic to verify signed login payload
  // Placeholder: return params for now
  return { payload: _params.payload, signature: _params.signature };
}

export async function isLoggedIn() {
  // TODO: Implement server logic to check user session
  return { loggedIn: false };
}

export async function doLogout() {
  // TODO: Implement server logic to destroy user session
  return {};
}

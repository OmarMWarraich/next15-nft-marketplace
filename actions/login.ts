// Server actions for thirdweb ConnectButton auth prop
// Implement these to call your backend or handle session logic as needed
// spell-checker: disable-line

export async function getLoginPayload(params: { address: string }) {
  // TODO: Implement server logic to generate login payload for address
  // Example usage of params to avoid unused variable error
  return { address: params.address };
}

export async function doLogin(params: { payload: string; signature: string }) {
  // TODO: Implement server logic to verify signed login payload
  // Example usage of params to avoid unused variable error
  return { payload: params.payload, signature: params.signature };
}

export async function isLoggedIn() {
  // TODO: Implement server logic to check user session
  return { loggedIn: false };
}

export async function doLogout() {
  // TODO: Implement server logic to destroy user session
  return {};
}

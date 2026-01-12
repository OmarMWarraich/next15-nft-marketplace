import { prepareContractCall, type ThirdwebContract } from "thirdweb";
import type { Abi } from "abitype";
import { toWei } from "thirdweb/utils";

export function prepareCreateTokenTx(options: {
  contract: ThirdwebContract<Abi>;
  tokenUri: string;
  priceEth: string;
  listingFeeWei: bigint;
}) {
  const priceWei = toWei(options.priceEth);

  return prepareContractCall({
    contract: options.contract,
    method:
      "function createToken(string tokenURI, uint256 price) payable returns (uint256)",
    params: [options.tokenUri, priceWei],
    value: options.listingFeeWei,
  });
}

import { describe, expect, it, vi } from "vitest";

vi.mock("thirdweb", () => ({
  prepareContractCall: vi.fn(),
}));

import { prepareContractCall } from "thirdweb";
import { toWei } from "thirdweb/utils";
import { prepareCreateTokenTx } from "./marketplaceTx";
import type { ThirdwebContract } from "thirdweb";
import type { Abi } from "abitype";

const mockPrepareContractCall = prepareContractCall as unknown as ReturnType<
  typeof vi.fn
>;

describe("prepareCreateTokenTx", () => {
  it("builds a payable createToken tx with wei price", () => {
    const contract = { __mock: true } as unknown as ThirdwebContract<Abi>;
    const listingFeeWei = 25_000_000_000_000_000n;

    mockPrepareContractCall.mockReturnValueOnce({ __tx: true });

    const tx = prepareCreateTokenTx({
      contract,
      tokenUri: "ipfs://metadata",
      priceEth: "0.5",
      listingFeeWei,
    });

    expect(tx).toEqual({ __tx: true });

    expect(mockPrepareContractCall).toHaveBeenCalledTimes(1);
    expect(mockPrepareContractCall.mock.calls[0][0]).toMatchObject({
      contract,
      method:
        "function createToken(string tokenURI, uint256 price) payable returns (uint256)",
      params: ["ipfs://metadata", toWei("0.5")],
      value: listingFeeWei,
    });
  });
});

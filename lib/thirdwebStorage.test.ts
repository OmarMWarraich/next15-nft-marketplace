import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("thirdweb/storage", () => ({
  upload: vi.fn(),
  resolveScheme: vi.fn(),
}));

vi.mock("./client", () => ({
  client: { __mock: true },
}));

import { resolveScheme, upload } from "thirdweb/storage";
import { resolveIpfsUri, uploadNftMetadata } from "./thirdwebStorage";

const mockUpload = upload as unknown as ReturnType<typeof vi.fn>;
const mockResolveScheme = resolveScheme as unknown as ReturnType<typeof vi.fn>;

describe("uploadNftMetadata", () => {
  beforeEach(() => {
    mockUpload.mockReset();
    mockResolveScheme.mockReset();
  });

  it("uploads image then metadata and returns ipfs uris", async () => {
    mockUpload
      .mockResolvedValueOnce("ipfs://image")
      .mockResolvedValueOnce("ipfs://metadata");

    const file = new File(["hello"], "nft.png", { type: "image/png" });

    await expect(
      uploadNftMetadata({
        name: "My NFT",
        description: "Desc",
        imageFile: file,
      })
    ).resolves.toEqual({
      tokenUri: "ipfs://metadata",
      imageUri: "ipfs://image",
    });

    expect(mockUpload).toHaveBeenCalledTimes(2);

    expect(mockUpload.mock.calls[0][0]).toMatchObject({
      files: [file],
    });

    expect(mockUpload.mock.calls[1][0]).toMatchObject({
      files: [
        {
          name: "metadata.json",
          data: { name: "My NFT", description: "Desc", image: "ipfs://image" },
        },
      ],
    });
  });

  it("rejects missing required fields", async () => {
    const file = new File(["hello"], "nft.png", { type: "image/png" });

    await expect(
      uploadNftMetadata({ name: "", description: "x", imageFile: file })
    ).rejects.toThrow("Missing name");

    await expect(
      uploadNftMetadata({ name: "x", description: "", imageFile: file })
    ).rejects.toThrow("Missing description");
  });
});

describe("resolveIpfsUri", () => {
  beforeEach(() => {
    mockResolveScheme.mockReset();
  });

  it("returns resolved https url for ipfs uri", () => {
    mockResolveScheme.mockReturnValueOnce("https://example.invalid/ipfs/Qm123");

    expect(resolveIpfsUri("ipfs://Qm123")).toBe(
      "https://example.invalid/ipfs/Qm123"
    );

    expect(mockResolveScheme).toHaveBeenCalledWith({
      client: { __mock: true },
      uri: "ipfs://Qm123",
    });
  });

  it("falls back to input uri if resolveScheme throws", () => {
    mockResolveScheme.mockImplementationOnce(() => {
      throw new Error("boom");
    });

    expect(resolveIpfsUri("ipfs://Qm123")).toBe("ipfs://Qm123");
  });
});

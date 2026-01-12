"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { getContract, readContract } from "thirdweb";
import {
  useActiveAccount,
  useActiveWalletChain,
  useSendTransaction,
} from "thirdweb/react";

import Input from "@/components/Input";
import images from "@/public/assets";
import { Button } from "@/components/ui/button";
import { resolveIpfsUri, uploadNftMetadata } from "@/lib/thirdwebStorage";
import { client } from "@/lib/client";
import { localChain } from "@/lib/chain";
import { MarketAddress, MarketAddressABI } from "@/context/constants";
import { prepareCreateTokenTx } from "@/lib/marketplaceTx";

const CreateItem = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const { mutateAsync: sendTransaction } = useSendTransaction();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    setFile(acceptedFiles?.[0] ?? null);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed  
       ${isDragActive ? " border-file-active " : ""} 
       ${isDragAccept ? " border-file-accept " : ""} 
       ${isDragReject ? " border-file-reject " : ""}`,
    [isDragActive, isDragReject, isDragAccept]
  );

  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  const createMarket = async () => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !file) return;
    try {
      setIsSubmitting(true);
      setError(null);

      if (!account) {
        throw new Error("Please connect your wallet first.");
      }

      if (!activeChain || activeChain.id !== localChain.id) {
        throw new Error(
          `Please switch your wallet network to ${localChain.name} (${localChain.id}).`
        );
      }

      const { tokenUri, imageUri } = await uploadNftMetadata({
        name,
        description,
        imageFile: file,
      });

      const contract = getContract({
        client,
        chain: localChain,
        address: MarketAddress,
        abi: MarketAddressABI,
      });

      const listingFeeWei = await readContract({
        contract,
        method: "function getListingPrice() view returns (uint256)",
      });

      const tx = prepareCreateTokenTx({
        contract,
        tokenUri,
        priceEth: price,
        listingFeeWei,
      });

      await sendTransaction(tx);

      console.log(
        "NFT created/listed successfully. tokenUri:",
        tokenUri,
        resolveIpfsUri(imageUri)
      );

      router.push("/");
    } catch (error) {
      console.log("Error uploading file: ", error);

      const message = error instanceof Error ? error.message : "Upload failed";
      if (message.includes('Cannot decode zero data ("0x")')) {
        setError(
          `Marketplace contract call returned empty data. This usually means the contract isn't deployed at ${MarketAddress} on ${localChain.name} (${localChain.id}) or the RPC URL is wrong. If needed, set NEXT_PUBLIC_MARKET_ADDRESS and/or NEXT_PUBLIC_LOCAL_RPC_URL in .env.local, then restart dev server.`
        );
      } else {
        setError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Create new item
        </h1>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload file
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  Or browse media on your device
                </p>

                {file && (
                  <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-4">
                    Selected: {file.name}
                  </p>
                )}

                {error && (
                  <p className="font-poppins text-file-reject font-semibold text-sm mt-4">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="Asset Name"
          handleClick={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => updateFormInput({ ...formInput, name: e.target.value })}
        />

        <Input
          inputType="textarea"
          title="Description"
          placeholder="Asset Description"
          handleClick={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => updateFormInput({ ...formInput, description: e.target.value })}
        />

        <Input
          inputType="number"
          title="Price"
          placeholder="Asset Price"
          handleClick={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => updateFormInput({ ...formInput, price: e.target.value })}
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            variant="default"
            className="rounded-xl"
            onClick={createMarket}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Item"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;

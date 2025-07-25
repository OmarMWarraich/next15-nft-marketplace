"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import Input from "@/components/Input";
import images from "@/public/assets";
import { Button } from "@/components/ui/button";

const CreateItem = () => {
  const onDrop = useCallback(async () => {}, []);

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
    if (!name || !description || !price) return;
    try {
      router.push("/");
    } catch (error) {
      console.log("Error uploading file: ", error);
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
          >
            Create Item
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;

import { upload } from "thirdweb/storage";

import { client } from "./client";

export type CreateNftMetadataInput = {
  name: string;
  description: string;
  imageFile: File;
};

export async function uploadNftMetadata({
  name,
  description,
  imageFile,
}: CreateNftMetadataInput): Promise<{ tokenUri: string; imageUri: string }> {
  const trimmedName = name.trim();
  const trimmedDescription = description.trim();

  if (!trimmedName) throw new Error("Missing name");
  if (!trimmedDescription) throw new Error("Missing description");
  if (!imageFile) throw new Error("Missing image file");

  const imageUri = await upload({ client, files: [imageFile] });

  const metadata = {
    name: trimmedName,
    description: trimmedDescription,
    image: imageUri,
  };

  const tokenUri = await upload({
    client,
    files: [{ name: "metadata.json", data: metadata }],
  });

  return { tokenUri, imageUri };
}

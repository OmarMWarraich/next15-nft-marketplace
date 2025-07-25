"use client";

import Image, { StaticImageData } from "next/image";
import { useTheme } from "next-themes";

import images from "@/public/assets";
// import { cn } from "@/lib/utils";

// import { NFTContext } from "../context/NFTContext";

interface CreatorCardProps {
  rank: number;
  creatorImage: string | StaticImageData;
  creatorName: string;
  creatorEths: number;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
  rank,
  creatorImage,
  creatorName,
  creatorEths,
}) => {
  //   const { nftCurrency } = useContext(NFTContext);
  useTheme();
  return (
    <div className="min-w-190 minlg:min-w-240 border border-nft-gray-1 dark:border-nft-black-3 rounded-3xl flex flex-col p-4 m-4 bg-nft-gray-2 dark:bg-nft-black-1">
      <div className="w-8 h-8 minlg:w-10 minlg:h-10 rounded-full bg-nft-red-violet flexCenter">
        <p className="font-poppins text-white font-semibold text-base minlg:text-lg ">
          {rank}
        </p>
      </div>

      <div className="my-2 flex justify-center">
        <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
          <Image
            src={creatorImage}
            layout="fill"
            objectFit="cover"
            alt="creator"
            className="rounded-full"
          />
          <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
            <Image
              src={images.tick}
              layout="fill"
              objectFit="contain"
              alt="tick"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">
        <p className="font-poppins text-nft-black-1 font-semibold dark:text-nft-gray-1">
          {creatorName}
        </p>
        <p className="mt-1 font-poppins font-semibold text-nft-black-1 dark:text-nft-gray-1">
          {creatorEths.toFixed(2)}{" "}
          {/* <span className="font-normal">{nftCurrency}</span> */}
          <span className="font-normal">ETH</span>
        </p>
      </div>
    </div>
  );
};

export default CreatorCard;

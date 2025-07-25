"use client";

import NFTCard from "@/components/NFTCard";
import { makeid } from "@/utils/makeId";

const CreatorDashboard = () => {
  // ...existing code...

  return (
    <div className="flex justify-center sm:px-4 p-12 min-h-screen">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl mt-2 ml-4 sm:ml-2 font-semibold">
            NFTs Listed for Sale
          </h2>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {/* {nfts.map((nft) => (
              <NFTCard key={`nft-${nft.tokenId}`} nft={nft} />
            ))} */}

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  price: (10 - i * 0.534).toFixed(2),
                  seller: `0x${makeid(3)}...${makeid(4)}`,
                  owner: `0x${makeid(3)}...${makeid(4)}`,
                  description: "Cool NFT on Sale",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;

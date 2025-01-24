"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

import CreatorCard from "@/components/CreatorCard";
// import NFTCard from "@/components/NFTCard";
// import Loader from "@/components/Loader";

// import { getCreators } from "@/utils/getTopCreators";
import { shortenAddress } from "@/utils/shortenAddress";
import images from "@/public/assets";
import { makeid } from "@/utils/makeId";

const Dashboard = () => {
  interface NFT {
    price: number;
    tokenId: number;
  }

  const [nfts, setNfts] = useState<NFT[]>([]);
  //   const [nftsCopy, setNftsCopy] = useState<NFT[]>([]);
  //   const [isLoading, setIsLoading] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);
  const [activeSelect, setActiveSelect] = useState("Recently Added");

  const scrollRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case "Price (low to high)":
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case "Price (high to low)":
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case "Recently added":
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  const handleScroll = (direction: string) => {
    const current = scrollRef.current as HTMLDivElement;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const current = scrollRef.current as HTMLDivElement;
    const parent = parentRef.current as HTMLDivElement;

    if (current?.scrollWidth >= parent?.offsetWidth)
      return setHideButtons(false);
    setHideButtons(true);
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);

    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  }, [nfts]);

  //   const creators = getCreators(nfts);

  return (
    <div
      className="relative flex-1 max-w-full flex mt-3 justify-center"
      ref={parentRef}
    >
      <div
        className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none "
        ref={scrollRef}
      >
        {/* {creators.map((creator, i) => (
          <CreatorCard
            key={creator.seller}
            rank={i + 1}
            creatorImage={images[`creator${i + 1}`]}
            creatorName={shortenAddress(creator.seller)}
            creatorEths={creator.sumall}
          />
        ))} */}
        {[6, 7, 8, 9, 10].map((i) => (
          <CreatorCard
            key={`creator-${i}`}
            rank={i}
            creatorImage={images[`creator${i}`]}
            creatorName={`0x${makeid(3)}...${makeid(4)}`}
            creatorEths={(10 - i) * 0.534}
          />
        ))}
        {!hideButtons && (
          <>
            <div
              onClick={() => handleScroll("left")}
              className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
            >
              <Image
                src={images.left}
                layout="fill"
                objectFit="contain"
                alt="left_arrow"
              />
            </div>
            <div
              onClick={() => handleScroll("right")}
              className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
            >
              <Image
                src={images.right}
                layout="fill"
                objectFit="contain"
                alt="left_arrow"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

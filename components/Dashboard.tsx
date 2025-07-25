"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import CreatorCard from "@/components/CreatorCard";
import images from "@/public/assets";
import NFTCard from "./NFTCard";

interface DashboardProps {
  addresses: string[];
}

const Dashboard = ({ addresses }: DashboardProps) => {
  const [hideButtons, setHideButtons] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: string) => {
    const current = scrollRef.current;
    if (!current) return;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const current = scrollRef.current;
    const parent = parentRef.current;
    if (!current || !parent) return;
    if (current.scrollWidth >= parent.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);
    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  }, []);

  return (
    <>
      <div
        className="relative flex-1 max-w-full flex mt-3 justify-center"
        ref={parentRef}
      >
        <div
          className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none "
          ref={scrollRef}
        >
          {[6, 7, 8, 9, 10].map((i, idx) => (
            <CreatorCard
              key={`creator-${i}`}
              rank={i}
              creatorImage={images[`creator${i}`]}
              creatorName={`0x${addresses[idx]}...${i}def`}
              creatorEths={(10 - i) * 0.534}
            />
          ))}
          {!hideButtons && (
            <>
              <div
                onClick={() => handleScroll("left")}
                className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0 ms-4"
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
      <div className="mt-10">
        <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
          <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
            Hot Bids
          </h1>

          <div className="flex-2 sm:w-full flex flex-row sm:flex-col"></div>
        </div>
        <div className="mt-3 w-full flex flex-wrap justify-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <NFTCard
              key={`nft-${i}`}
              nft={{
                i,
                name: `Nifty NFT ${i}`,
                price: (10 - i * 0.534).toFixed(2),
                seller: "0x9E3...1c2f",
                owner: "0xA45...bDe1",
                description: "Cool NFT on Sale",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

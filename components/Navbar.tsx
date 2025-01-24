"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Theme from "./navbar/Theme";
import images from "../public/assets";

type CheckActiveProps = {
  active: string;
  setActive: (item: string) => void;
  router: any;
};

const NAV_ITEMS = [
  { label: "Explore NFTs", path: "/" },
  { label: "Listed NFTs", path: "/created-nfts" },
  { label: "My NFTs", path: "/my-nfts" },
];

const routeToActiveLabel: Record<string, string> = {
  "/": "Explore NFTs",
  "/created-nfts": "Listed NFTs",
  "/my-nfts": "My NFTs",
  "/create-nft": "",
};

const MenuItems: React.FC<{
  isMobile: boolean;
  active: string;
  setActive: (item: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isMobile, active, setActive, setIsOpen }) => (
  <ul
    className={`list-none flexCenter ${
      isMobile ? "flex-col h-full" : "flex-row"
    }`}
  >
    {NAV_ITEMS.map(({ label, path }) => (
      <li
        key={label}
        onClick={() => {
          setActive(label);
          if (isMobile) setIsOpen(false);
        }}
        className={`mx-3 font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark ${
          active === label
            ? "dark:text-white text-nft-black-1"
            : "dark:text-nft-gray-3 text-nft-gray-2"
        } ${isMobile && "my-5 text-xl"}`}
      >
        <Link href={path}>{label}</Link>
      </li>
    ))}
  </ul>
);

const ButtonGroup: React.FC<{
  setActive: (item: string) => void;
  router: any;
}> = ({ setActive, router }) => {
  const hasConnected = true;
  return hasConnected ? (
    <div className="flexCenter">
      <Button
        variant="default"
        className="mx-2 rounded-xl"
        onClick={() => {
          setActive("");
          router.push("/create-nft");
        }}
      >
        Create
      </Button>
    </div>
  ) : (
    <div className="flexCenter">
      <Button
        variant="default"
        className="mx-2 rounded-xl"
        onClick={() => {
          setActive("");
          router.push("/connect-wallet");
        }}
      >
        Connect Wallet
      </Button>
    </div>
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState("Explore NFTs");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => setTheme("dark"), []);

  useEffect(() => setActive(routeToActiveLabel[pathname] || ""), [pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "visible";
  }, [isOpen]);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b  dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => setActive("Explore NFTs")}
          >
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="font-semibold text-lg ml-1">NFT Marketplace</p>
          </div>
        </Link>
        <Link href="/">
          <div
            className="hidden md:flex"
            onClick={() => {
              setActive("Explore NFTs");
              setIsOpen(false);
            }}
          >
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-initial flex-row justify-end items-center">
        <div className="md:hidden flexCenter">
          <MenuItems
            active={active}
            setActive={setActive}
            isMobile={false}
            setIsOpen={setIsOpen}
          />
          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>

        <Theme />

        <div className="hidden md:flex ml-2">
          {!isOpen ? (
            <Image
              src={images.menu}
              objectFit="contain"
              width={25}
              height={25}
              alt="menu"
              onClick={() => setIsOpen(true)}
              className={theme === "light" ? "filter invert" : ""}
            />
          ) : (
            <Image
              src={images.cross}
              objectFit="contain"
              width={20}
              height={20}
              alt="close"
              onClick={() => setIsOpen(false)}
              className={theme === "light" ? "filter invert" : ""}
            />
          )}

          {isOpen && (
            <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex flex-col justify-between">
              <div className="flex-1 p-4">
                <MenuItems
                  active={active}
                  setActive={setActive}
                  isMobile
                  setIsOpen={setIsOpen}
                />
              </div>
              <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
                <ButtonGroup setActive={setActive} router={router} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

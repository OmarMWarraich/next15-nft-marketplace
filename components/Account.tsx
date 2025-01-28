"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";

export const Account: React.FC = () => {
  const {
    isConnected,
    address,
    caipAddress,
    status,
    embeddedWalletInfo,
    allAccounts,
  } = useAppKitAccount();
  return (
    <Carousel className="w-full max-w-md mx-auto">
      <CarouselContent className="-mt-1">
        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-sm font-semibold break-all">
                  <i>
                    <b>
                      <h6>Connected</h6>
                    </b>
                  </i>{" "}
                  :{" "}
                  <span className="break-all">
                    {" "}
                    {isConnected ? "Connected" : "Not Connected"}
                  </span>
                </span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-sm font-semibold">
                  <i>
                    <b>Address</b>
                  </i>{" "}
                  : <span className="break-all">{address}</span>
                </span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-sm font-semibold">
                  <i>
                    <b>CaipAddress</b>
                  </i>{" "}
                  : <span className="break-all">{caipAddress}</span>
                </span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-sm font-semibold">
                  <i>Status</i> : <span className="break-all">{status}</span>
                </span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-sm font-semibold">
                  <i>
                    <b>Wallet Info</b>
                  </i>
                  <code>
                    {embeddedWalletInfo
                      ? JSON.stringify(embeddedWalletInfo, null, 2)
                      : "No Wallet Info"}
                  </code>
                </span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-sm font-semibold">
                  <i>
                    <b>Accounts</b>
                  </i>{" "}
                  :{" "}
                  <span className="break-all">
                    {allAccounts.map((account, index) => (
                      <div key={index}>{JSON.stringify(account, null, 2)}</div>
                    ))}
                  </span>
                </span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

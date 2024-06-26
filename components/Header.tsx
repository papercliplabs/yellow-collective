import Image from "next/image";
import { useDAOAddresses, useTreasuryBalance } from "hooks";
import Link from "next/link";
import { ETHERSCAN_BASEURL } from "constants/urls";
import CustomConnectButton from "./CustomConnectButton";
import {TOKEN_CONTRACT } from "constants/addresses";
import Button from "./Button";
import { formatNumber } from "@/utils/formatNumber";
import { ethers } from "ethers";
import { CountUpDisplay } from "./CountUpDisplay";
import React, { useEffect, useState } from 'react';
import { useCurrentAuctionInfo,useContractInfo} from "hooks";


interface AuctionInfo {
  startTime: string;
  endTime: number;
}

export default function Header() {
  const { data: addresses } = useDAOAddresses({
    tokenContract: TOKEN_CONTRACT,
  });
  const { data: treasury } = useTreasuryBalance({
    treasuryContract: addresses?.treasury,
  });

  const { data: contractInfo } = useContractInfo();
  const { data: auctionInfo } =
    useCurrentAuctionInfo({
      auctionContract: contractInfo?.auction,
    });

    const [auctionOver, setAuctionOver] = useState<boolean>(false);

    useEffect(() => {
      const intervalId = setInterval(() => {
        const timeRemaining = Math.max(
          (auctionInfo?.endTime || 0) - Math.round(Date.now() / 1000),
          0
        );
        setAuctionOver(timeRemaining == 0);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [auctionInfo]);

  return (
    <div className="flex items-center justify-between w-full px-4 md:px-10 py-2 h-[80px] gap-2">
      <div className="flex flex-row gap-4 md:gap-8 justify-start items-center">
        <div>
          <Link href="/">
            <Image src="/noggles.svg" width={80} height={30} alt="Coppa Nouns" />
          </Link>
        </div>
        <div className="flex flex-row justify-start items-center mobile-fix">
          <div>
            <Button variant="outline" size="tight">
              <Link
                href={`${ETHERSCAN_BASEURL}/tokenholdings?a=${addresses?.treasury}`}
                rel="noreferer noopener noreferrer"
                target="_blank"
              >
                <h6 className="text-[--brand-text-main]">
                  Treasury:{" "}Ξ{" "}
                  {treasury
                    ? formatNumber(ethers.utils.formatEther(treasury), 2)
                    : "0"}
                </h6>
              </Link>
            </Button>
          </div>
          <div className="flex-row flex whitespace-nowrap items-center justify-center w-full px-4 gap-2 bg-transparent border-[--brand-text-main] border py-[13px]">
            <h6 className="text-[--brand-text-main]">
              {auctionOver ? (
              "Auction ended"
                ) : (
                  <div className="items-center" >
                <CountUpDisplay to={auctionInfo?.startTime || "0"} />  
                </div>
                )}
            </h6>
          </div>
        </div>
      </div>
      <CustomConnectButton className="px-6 h-10 border  transition ease-in-out hover:scale-110" />
    </div>
  );
}

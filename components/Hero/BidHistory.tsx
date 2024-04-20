import { Bid } from "@/services/nouns-builder/auction";
import { formatNumber } from "@/utils/formatNumber";
import { utils } from "ethers";
import ExternalLink from "../ExternalLink";
import Image from "next/image";
import { ETHERSCAN_BASEURL } from "constants/urls";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../Dialog";
import { twMerge } from "tailwind-merge";
import WalletInfo from "../WalletInfo";

function BidRow({ bid, tight }: { bid: Bid; tight: boolean }) {
  return (
    <div
      className={twMerge(
        "flex flex-row   justify-between items-center w-full",
        !tight && "py-3 border-b-2 border-transparent/10"
      )}
    >
      <WalletInfo address={bid.bidder} size="sm" />
      <ExternalLink href={`${ETHERSCAN_BASEURL}/tx/${bid.transactionHash}`}>
        <div className="flex flex-row gap-2 items-center hover:opacity-70 transition-opacity">
          <h6 className="text-primary/70">
            Ξ {formatNumber(utils.formatEther(bid.bidAmount || "0"), 3)}
          </h6>
          <Image
            src="/link.svg"
            width={24}
            height={24}
            alt="view"
            className=" "
          />
        </div>
      </ExternalLink>
    </div>
  );
}

export default function BidHistory({
  tokenId,
  tokenImage,
  bids,
  numToShow,
  title,
}: {
  tokenId: string;
  tokenImage?: string;
  bids?: Bid[];
  numToShow: number;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center">
      {bids?.slice(0, numToShow).map((bid, i) => {
        return <BidRow bid={bid} tight={false} key={i} />;
      })}
      {(bids?.length ?? 0) > numToShow && (
        <Dialog>
          <DialogTrigger>
            <h6 className="pt-3  text-primary/70 hover:text-primary/50">
              {title}
            </h6>
          </DialogTrigger>
          <DialogContent className="flex flex-col max-h-[90vh] md:max-h-[70vh]">
            <DialogHeader>
              <div className="flex flex-row gap-4 items-center border-b-2 p-6">
                <Image
                  src={tokenImage ?? ""}
                  width={64}
                  height={64}
                  alt=""
                  className="rounded-xl border-transparent/10 border-2"
                />
                <div className="flex flex-col items-start">
                  <h6 className="text-secondary">Bids for</h6>
                  <h5>Collective Noun #{parseInt(tokenId, 16)}</h5>
                </div>
              </div>
            </DialogHeader>
            <div className="flex flex-col gap-6 p-6 overflow-y-auto">
              {bids?.map((bid, i) => <BidRow bid={bid} tight={true} key={i} />)}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

import { useTheme } from "@/hooks/useTheme";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";
import { Address, useAccount } from "wagmi";
import Image from "next/image";
import clsx from "clsx";
import { zeroAddress } from "viem";
import WalletInfo from "./WalletInfo";

export type CustomConnectButtonProps = {
  className: string;
};

const CustomConnectButton = ({ className }: CustomConnectButtonProps) => {
  const { address } = useAccount();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button variant="secondary" onClick={openConnectModal}>
                    Connect
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button variant="negative" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }
              return (
                <Button
                  variant="secondary"
                  onClick={openAccountModal}
                  className="flex flex-row gap-2 "
                >
                  <WalletInfo address={account.address as Address} size="sm" />
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;

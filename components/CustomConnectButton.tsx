import { useTheme } from "@/hooks/useTheme";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";
import { Address, useAccount } from "wagmi";
import useEnsName from "@/hooks/useEnsName";
import useEnsAvatar from "@/hooks/useEnsAvatar";
import Image from "next/image";
import clsx from "clsx";
import UserAvatar from "./UserAvatar";
import { zeroAddress } from "viem";

export type CustomConnectButtonProps = {
    className: string;
};

const CustomConnectButton = ({ className }: CustomConnectButtonProps) => {
    const { address } = useAccount();
    const ensName = useEnsName(address);

    return (
        <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
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
                                    className="flex flex-row gap-2 py-[11px]"
                                >
                                    <UserAvatar
                                        address={account.address as Address}
                                        diameter={32}
                                        className="w-[32px] h-[32px] rounded-full"
                                    />
                                    <h6 className="hidden md:block">{ensName ?? account.displayName}</h6>
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

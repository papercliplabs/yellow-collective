import { useTheme } from "@/hooks/useTheme";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";
import { useAccount } from "wagmi";
import useEnsName from "@/hooks/useEnsName";
import useEnsAvatar from "@/hooks/useEnsAvatar";
import Image from "next/image";

export type CustomConnectButtonProps = {
    className: string;
};

const CustomConnectButton = ({ className }: CustomConnectButtonProps) => {
    const { address } = useAccount();
    const ensName = useEnsName(address);
    const ensAvatar = useEnsAvatar(address);

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
                                <Button variant="secondary" onClick={openAccountModal} className="flex flex-row gap-2">
                                    {ensAvatar && (
                                        <Image
                                            src={ensAvatar}
                                            width={24}
                                            height={24}
                                            alt=""
                                            className="rounded-full hidden md:block"
                                        />
                                    )}
                                    <h6>{ensName ?? account.displayName}</h6>
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

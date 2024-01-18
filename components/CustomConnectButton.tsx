import { useTheme } from "@/hooks/useTheme";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";

export type CustomConnectButtonProps = {
    className: string;
};

const CustomConnectButton = ({ className }: CustomConnectButtonProps) => {
    const [theme] = useTheme();

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
                                <Button variant="secondary" onClick={openAccountModal}>
                                    {account.displayName}
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

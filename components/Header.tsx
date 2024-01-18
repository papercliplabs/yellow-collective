import Image from "next/image";
import { useContractInfo, useDAOAddresses, useTreasuryBalance, useTheme } from "hooks";
import NavigationItemsComponent from "./NavigationItem";
import Link from "next/link";
import { ETHERSCAN_BASEURL } from "constants/urls";
import CustomConnectButton from "./CustomConnectButton";
import { Bars3Icon } from "@heroicons/react/20/solid";
import MobileMenu from "./MobileMenu";
import { Fragment, useState } from "react";
import { TOKEN_CONTRACT } from "constants/addresses";
import { formatTreasuryBalance } from "@/utils/formatTreasuryBalance";
import Button from "./Button";

export default function Header() {
    const { data: addresses } = useDAOAddresses({
        tokenContract: TOKEN_CONTRACT,
    });
    const { data: treasury } = useTreasuryBalance({
        treasuryContract: addresses?.treasury,
    });

    return (
        <div className="flex items-center justify-between w-full px-4 md:px-10 py-2 h-[80px] gap-2">
            <div className="flex flex-row gap-2 md:gap-8 justify-start items-center">
                <Link href="/">
                    <Image src="/noggles.svg" width={80} height={30} alt="Yellow" />
                </Link>
                <Button variant="outline">
                    <Link
                        href={`${ETHERSCAN_BASEURL}/tokenholdings?a=${addresses?.treasury}`}
                        rel="noreferer noopener noreferrer"
                        target="_blank"
                    >
                        <h6>Ξ {treasury ? formatTreasuryBalance(treasury) : "0"}</h6>
                    </Link>
                </Button>
            </div>

            <CustomConnectButton className="bg-skin-backdrop px-6 h-10 rounded-xl border border-skin-stroke text-skin-base transition ease-in-out hover:scale-110" />
        </div>
    );
}

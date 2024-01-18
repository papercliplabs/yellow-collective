import { useTheme } from "@/hooks/useTheme";
import NavigationItemComponent from "./NavigationItem";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";

const navItems = [
    {
        href: "TODO",
        src: "/tiktok.svg",
    },
    {
        href: "TODO",
        src: "/instagram.svg",
    },
    {
        href: "TODO",
        src: "/x.svg",
    },
    {
        href: "TODO",
        src: "/youtube.svg",
    },
];

export default function Footer() {
    return (
        <div className="flex justify-around pb-16">
            <div className="flex flex-wrap items-center gap-4">
                {navItems.map((item, i) => (
                    <Button variant="secondary" size="rounded" key={i}>
                        <Link href={item.href} target="_blank" rel="noreferer noopener noreferrer">
                            <Image src={item.src} width={24} height={24} alt="" />
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    );
}

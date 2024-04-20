import { useTheme } from "@/hooks/useTheme";
import NavigationItemComponent from "./NavigationItem";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import ExternalLink from "./ExternalLink";

const navItems = [
  {
    href: "https://www.tiktok.com/@thenounsquare",
    src: "/tiktok.svg",
  },
  {
    href: "https://www.instagram.com/thenounsquare",
    src: "/instagram.svg",
  },
  {
    href: "https://twitter.com/thenounsquare",
    src: "/x.svg",
  },
  {
    href: "https://www.youtube.com/channel/UC1Iqmi7SCEzWlWP-huyh9xw",
    src: "/youtube.svg",
  },
  {
    href: "https://warpcast.com/~/channel/yellow",
    src: "/farcaster.svg",
  },
];

export default function Footer() {
  return (
    <div className="flex  pb-16 pt-4 flex-col justify-center items-center gap-16">
      <div className="flex flex-wrap items-center gap-4">
        {navItems.map((item, i) => (
          <Button variant="secondary" size="rounded" key={i}>
            <Link
              href={item.href}
              target="_blank"
              rel="noreferer noopener noreferrer"
            >
              <Image src={item.src} width={24} height={24} alt="" />
            </Link>
          </Button>
        ))}
      </div>
      <div className="caption text-secondary">
        Made with ❤️ by{" "}
        <ExternalLink href="https://paperclip.xyz/">
          Paperclip Labs
        </ExternalLink>
      </div>
    </div>
  );
}

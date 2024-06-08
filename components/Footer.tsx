import Button from "./Button";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  {
    href: "https://warpcast.com/~/channel/coppanouns",
    src: "/farcaster.svg",
  },
  {
    href: "https://twitter.com/thenounsquare",
    src: "/x.svg",
  }
];

export default function Footer() {
  return (
    <div className="flex  pb-16 pt-4 flex-col justify-center items-center gap-16">
      <div className="flex flex-wrap items-center gap-4">
        {navItems.map((item, i) => (
          <Button variant="footer" size="rounded" key={i}>
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
    </div>
  );
}

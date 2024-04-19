import Link from "next/link";
import React from "react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <Link
      href={href}
      rel="noreferer noopener noreferrer"
      target="_blank"
      className="text-accent-blue hover:brightness-75"
    >
      {children}
    </Link>
  );
}

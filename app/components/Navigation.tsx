"use client";

import Link from "next/link";
import { Session } from "next-auth";

import AccountDropdown from "./account/AccountDropdown";

const nav = [
  { name: "กำหนดการ", href: "/" },
  { name: "กีฬา", href: "/" },
  { name: "การแข่งขัน", href: "#competitions" },
  { name: "อันดับ", href: "/" },
];

export default function Navigation({
  session,
  displayName,
}: {
  session: Session | null;
  displayName?: string;
}) {
  return (
    <div className="fixed z-50 w-full flex justify-between items-center gap-4 px-5 md:px-10 lg:px-15 pt-12">
      <Link target="_blank" href="https://www.bj.ac.th/main">
        <img
          draggable={false}
          className="w-12 cursor-pointer"
          src="https://www.bj.ac.th/web/assets/images/BJ_LOGO_RE_2563_ENG.png"
          alt="BJ Logo"
        />
      </Link>
      <div className="w-2xl h-14 rounded-3xl backdrop-blur-lg md:px-4 lg:px-6 flex items-center justify-around bg-linear-to-b from-[#395c69bb] via-[#518696cc] to-[#6a9fa3] border-t border-t-white/60 border-l-2 border-l-white/40 border-r border-r-white/40 border-b border-b-white/30 shadow-lg">
        {nav.map(({ name, href }, index) => (
          <a
            key={index}
            href={href}
            className="text-white text-lg text-shadow-md cursor-pointer transition-colors duration-150 hover:text-gray-300"
          >
            {name}
          </a>
        ))}
      </div>
      <AccountDropdown session={session} displayName={displayName} />
    </div>
  );
}

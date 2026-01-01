"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const nav = [
  { name: "กำหนดการ", href: "/" },
  { name: "กีฬา", href: "/" },
  { name: "การแข่งขัน", href: "/" },
  { name: "อันดับ", href: "/" },
];

const avatar_slot = ["ship", "star", "skull"];

export default function Navigation() {
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    const random_avatar =
      avatar_slot[Math.floor(Math.random() * avatar_slot.length)];
    setAvatar(random_avatar);
  }, []);

  return (
    <div className="fixed z-50 w-full flex justify-between items-center gap-4 px-5 md:px-10 lg:px-15 pt-12">
      <img
        className="w-12"
        src="https://www.bj.ac.th/web/assets/images/BJ_LOGO_RE_2563_ENG.png"
        alt="BJ Logo"
      />
      <div className="w-2xl h-14 rounded-3xl backdrop-blur-lg md:px-4 lg:px-6 flex items-center justify-around bg-linear-to-b from-[#395c69bb] via-[#518696cc] to-[#6a9fa3] border-t border-t-white/60 border-l-2 border-l-white/40 border-r border-r-white/40 border-b border-b-white/30 shadow-lg">
        {nav.map(({ name }, index) => (
          <div
            key={index}
            className="text-white text-lg text-shadow-md cursor-pointer transition-colors duration-150 hover:text-gray-300"
          >
            {name}
          </div>
        ))}
      </div>
      <div className="relative flex flex-col items-center rounded-full w-14 aspect-square">
        {avatar && (
          <div className="w-full h-full rounded-full overflow-hidden p-2 bg-linear-to-b from-[#518696] to-[#6a9fa3] border border-white/60 hover:shadow-lg duration-75 cursor-pointer">
            <img
              className="w-full h-full opacity-50"
              src={`/icons/${avatar}.png`}
              alt="avatar"
            />
          </div>
        )}

        <Link
          href="/login"
          className="absolute bottom-0 translate-y-12 flex justify-center items-center rounded-xl h-8 w-24 bg-[#C12882] text-white text-center shadow-lg cursor-pointer animate-bounce"
        >
          เข้าสู่ระบบ!
        </Link>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ChangePinModal from "./ChangePinModal";

const nav = [
  { name: "กำหนดการ", href: "/" },
  { name: "กีฬา", href: "/" },
  { name: "การแข่งขัน", href: "/" },
  { name: "อันดับ", href: "/" },
];

const avatar_slot = ["ship", "star", "skull"];

export default function Navigation({ session }: { session?: Session | null }) {
  const [avatar, setAvatar] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'none' | 'login' | 'register' | 'changePin'>('none');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const random_avatar =
      avatar_slot[Math.floor(Math.random() * avatar_slot.length)];
    setAvatar(random_avatar);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
      signOut({ callbackUrl: "/" });
  };

  return (
    <div className="fixed z-50 w-full flex justify-between items-center gap-4 px-5 md:px-10 lg:px-15 pt-12">
      <Link href="/">
        <img
            className="w-12 cursor-pointer"
            src="https://www.bj.ac.th/web/assets/images/BJ_LOGO_RE_2563_ENG.png"
            alt="BJ Logo"
        />
      </Link>
      <div className="w-2xl h-14 rounded-3xl backdrop-blur-lg md:px-4 lg:px-6 flex items-center justify-around bg-linear-to-b from-[#395c69bb] via-[#518696cc] to-[#6a9fa3] border-t border-t-white/60 border-l-2 border-l-white/40 border-r border-r-white/40 border-b border-b-white/30 shadow-lg">
        {nav.map(({ name, href }, index) => (
          <Link
            key={index}
            href={href}
            className="text-white text-lg text-shadow-md cursor-pointer transition-colors duration-150 hover:text-gray-300"
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="relative flex flex-col items-center rounded-full w-14 aspect-square" ref={dropdownRef}>
        {avatar && (
          <div 
            onClick={() => session && setDropdownOpen(!dropdownOpen)}
            className="w-full h-full rounded-full overflow-hidden p-2 bg-linear-to-b from-[#518696] to-[#6a9fa3] border border-white/60 hover:shadow-lg duration-75 cursor-pointer relative z-50"
          >
            <img
              className="w-full h-full opacity-50"
              src={`/icons/${avatar}.png`}
              alt="avatar"
            />
          </div>
        )}

        {!session ? (
            <button
            onClick={() => setActiveModal('login')}
            className="absolute bottom-0 translate-y-12 flex justify-center items-center rounded-xl h-8 w-24 bg-[#C12882] text-white text-center shadow-lg cursor-pointer animate-bounce z-40 border-none"
            >
            เข้าสู่ระบบ!
            </button>
        ) : (
            <div className={`absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl overflow-hidden transition-all duration-200 origin-top-right border border-gray-100 ${dropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                <div className="py-1">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#1E6C74]/10 hover:text-[#1E6C74] font-medium transition-colors">
                        โปรไฟล์
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#1E6C74]/10 hover:text-[#1E6C74] font-medium transition-colors">
                        คอลเลกชั่น
                    </Link>
                    <button 
                        onClick={() => { setActiveModal('changePin'); setDropdownOpen(false); }}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-[#1E6C74]/10 hover:text-[#1E6C74] font-medium transition-colors"
                    >
                        เปลี่ยน PIN
                    </button>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#1E6C74]/10 hover:text-[#1E6C74] font-medium transition-colors">
                        แจ้งปัญหา
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                    >
                        ออกจากระบบ
                    </button>
                </div>
            </div>
        )}
      </div>

      <LoginModal 
        isOpen={activeModal === 'login'} 
        onClose={() => setActiveModal('none')}
        onRegisterClick={() => setActiveModal('register')}
      />

      <RegisterModal 
        isOpen={activeModal === 'register'} 
        onClose={() => setActiveModal('none')}
        onLoginClick={() => setActiveModal('login')}
      />

      <ChangePinModal
        isOpen={activeModal === 'changePin'}
        onClose={() => setActiveModal('none')}
      />
    </div>
  );
}

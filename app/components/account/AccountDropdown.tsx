"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Session } from "next-auth";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ChangePinModal from "./ChangePinModal";
import LogoutModal from "./LogoutModal";

export default function AccountDropdown({
  session,
  displayName,
}: {
  session?: Session | null;
  displayName?: string | null;
}) {
  const avatar_slot = ["ship", "star", "skull"];
  const [avatar, setAvatar] = useState<string>("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "none" | "login" | "register" | "changePin" | "logout"
  >("none");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const random_avatar =
      avatar_slot[Math.floor(Math.random() * avatar_slot.length)];
    setAvatar(random_avatar);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdown_menu_style =
    "block cursor-pointer w-full text-left block px-4 py-1.5 text-sm text-gray-700 hover:bg-[#1E6C74]/10 hover:text-[#1E6C74] font-medium transition-colors";

  return (
    <div
      className="relative flex flex-col items-center rounded-full w-14 aspect-square"
      ref={dropdownRef}
    >
      {avatar && (
        <div
          onClick={() =>
            session ? setDropdownOpen(!dropdownOpen) : setActiveModal("login")
          }
          className="group w-full h-full rounded-full overflow-hidden p-2 bg-linear-to-b from-[#e0f7ff] to-[#a4dcdf] border border-white/60 transition-all hover:shadow-lg hover:scale-105 duration-75 cursor-pointer relative z-50"
        >
          <img
            className="w-full h-full opacity-70 group-hover:animate-spin group-hover:opacity-80"
            src={`/icons/${avatar}.png`}
            alt="avatar"
          />
        </div>
      )}

      {!session ? (
        <button
          onClick={() => setActiveModal("login")}
          className="absolute bottom-0 translate-y-12 flex justify-center items-center rounded-xl h-8 w-24 bg-[#C12882] text-white text-center shadow-lg cursor-pointer animate-bounce z-40 border-none"
        >
          เข้าสู่ระบบ!
        </button>
      ) : (
        <div
          className={`absolute top-full right-0 mt-2 min-w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl overflow-hidden transition-all duration-200 origin-top-right border border-gray-100 ${
            dropdownOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="py-2">
            <div className="px-4 pt-2 pb-1 font-bold text-teal-900">
              ⚓ {displayName}
            </div>
            <div className="border-t border-gray-100 my-1"></div>
            <Link href="/profile" className={dropdown_menu_style}>
              โปรไฟล์
            </Link>
            <Link href="/collection" className={dropdown_menu_style}>
              คอลเลกชั่น
            </Link>
            <button
              onClick={() => {
                setActiveModal("changePin");
                setDropdownOpen(false);
              }}
              className={dropdown_menu_style}
            >
              เปลี่ยน PIN
            </button>
            <Link
              target="_blank"
              href="https://www.instagram.com/bj_ictp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className={dropdown_menu_style}
            >
              แจ้งปัญหา
            </Link>
            <div className="border-t border-gray-100 my-1"></div>
            <button
              onClick={() => {
                setActiveModal("logout");
                setDropdownOpen(false);
              }}
              className={`${dropdown_menu_style} text-red-600 hover:bg-red-50 hover:text-red-600`}
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal("none")}
        onRegisterClick={() => setActiveModal("register")}
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={() => setActiveModal("none")}
        onLoginClick={() => setActiveModal("login")}
      />

      <ChangePinModal
        isOpen={activeModal === "changePin"}
        onClose={() => setActiveModal("none")}
      />

      <LogoutModal
        isOpen={activeModal === "logout"}
        onClose={() => setActiveModal("none")}
      />
    </div>
  );
}

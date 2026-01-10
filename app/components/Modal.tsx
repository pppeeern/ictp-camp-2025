"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function Modal({
  children,
  style,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  style?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (typeof window == "undefined") return;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted || typeof window === "undefined") return null;
  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 w-screen h-screen flex items-center justify-center transition-all duration-100 ${
        isOpen
          ? "bg-black/40 backdrop-blur-xs opacity-100"
          : "backdrop-blur-md opacity-0"
      }`}
    >
      <button
        onClick={onClose}
        className="group z-[100] fixed top-6 right-6 p-1 hover:drop-shadow-md"
      >
        <img
          draggable="false"
          className="w-14 cursor-pointer group-hover:brightness-95 transition-all duration-100"
          src="/button/close-button.png"
          alt="close"
        />
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative transition-all duration-150 drop-shadow-2xl drop-shadow-black/40 ${style} ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-16 scale-75 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

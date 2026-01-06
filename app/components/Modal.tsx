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
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${style} ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-16 scale-75 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute p-1 cursor-pointer top-6 right-6 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          <img
            draggable="false"
            className="w-14 cursor-pointer hover:brightness-95 transition-all duration-100"
            src="/button/close-button.png"
            alt="close"
          />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

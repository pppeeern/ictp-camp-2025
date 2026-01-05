"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default function Modal({
  title,
  children,
  isOpen,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
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
    }
  }, [isOpen]);

  if (!mounted || typeof window === "undefined") return null;
  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 w-screen h-screen flex items-center justify-center transition-all duration-100 bg-black/40 backdrop-blur-xs`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-col justify-center bg-white rounded-lg max-w-2xl w-full mx-4 pt-6 pb-5 shadow-xl animate-in fade-in zoom-in-95 duration-200`}
      >
        <button
          onClick={onClose}
          className="absolute p-1 cursor-pointer top-3 right-4 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          <XIcon size={20} />
        </button>
        <h1 className="px-5 text-xl text-center font-bold text-[#1E6C74] mb-2">{title}</h1>
        <div className="w-full border-b border-gray-200 mb-4"></div>
        
        <div className="px-5 md:px-8 max-h-[70vh] overflow-y-auto">
            {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

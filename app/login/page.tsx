"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import Link from "next/link";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div
      id="landing"
      className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden"
    >
      <Link href={"/"}>
        <img
          draggable="false"
          className="absolute top-10 left-10 w-14 cursor-pointer hover:brightness-95 transition-all duration-100"
          src="/button/close-button.png"
          alt="close"
        />
      </Link>
      <img
        className="w-full absolute bottom-0 translate-y-5"
        src="/landing/water-1.png"
        alt="water-1"
      />
      <img
        className="w-[300px] md:w-[400px] lg:w-[500px] top-1/2 translate-y-[calc(50px)] absolute -left-30 rotate-14"
        src="/landing/rock-l.webp"
        alt="rock-left"
      />
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50">
        <div className="flex flex-col items-center gap-2 mb-4">
          <h1 className="text-5xl py-2 font-bold text-[#1E6C74]">
            เข้าสู่ระบบ
          </h1>
          <p className="text-gray-600">ลงชื่อเข้าใช้ด้วยรหัสนักเรียน</p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รหัสนักเรียน
            </label>
            <input
              type="text"
              name="studentId"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C12882] focus:border-transparent outline-none transition-all"
              placeholder="กรอกรหัสนักเรียน"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PIN (6 หลัก)
            </label>
            <input
              type="password"
              name="pin"
              inputMode="numeric"
              maxLength={6}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C12882] focus:border-transparent outline-none transition-all"
              placeholder="••••••"
              required
            />
          </div>

          <div className="flex items-center justify-end text-sm">
            <Link
              href="/register"
              className="text-[#1E6C74] hover:underline font-medium"
            >
              ยังไม่ได้ตั้งรหัส PIN?
            </Link>
          </div>

          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            aria-disabled={isPending}
            className="w-full bg-[#1E6C74] hover:bg-[#165157] text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
      </div>
    </div>
  );
}

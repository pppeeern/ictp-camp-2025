"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import Modal from "./Modal";

export default function LoginModal({
  isOpen,
  onClose,
  onRegisterClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}) {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <Modal title="เข้าสู่ระบบ" isOpen={isOpen} onClose={onClose}>
      <div className="pb-4">
          <p className="text-gray-500 text-center mb-6 mt-1">ลงชื่อเข้าใช้ด้วยรหัสนักเรียน</p>
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
              <button
                type="button"
                onClick={onRegisterClick}
                className="text-[#1E6C74] hover:underline font-medium bg-transparent border-none cursor-pointer"
              >
                ยังไม่ได้ตั้งรหัส PIN?
              </button>
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
    </Modal>
  );
}

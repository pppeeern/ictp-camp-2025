"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import Modal from "../Modal";
import AccountModal from "./AccountModal";

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
    <AccountModal
      title="เข้าสู่ระบบ"
      message="ลงชื่อเข้าใช้ด้วยรหัสนักเรียน"
      submit={isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
      submit_type="primary"
      action={formAction}
      modal_type="form"
      isOpen={isOpen}
      onClose={onClose}
    >
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

      {errorMessage && (
        <div
          className="flex h-8 justify-center  items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-red-500 text-sm">{errorMessage}</p>
        </div>
      )}
    </AccountModal>
  );
}

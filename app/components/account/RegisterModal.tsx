"use client";

import { useActionState } from "react";
import { register } from "@/app/lib/actions";
import Modal from "../Modal";
import AccountModal from "./AccountModal";

export default function RegisterModal({
  isOpen,
  onClose,
  onLoginClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}) {
  const [state, formAction, isPending] = useActionState(register, null);

  return (
    <AccountModal
      title="ลงทะเบียน"
      message="สำหรับใช้งานครั้งแรก"
      submit={isPending ? "กำลังบันทึก..." : "ลงทะเบียน"}
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
        {state?.errors?.studentId && (
          <p className="mt-1 text-sm text-red-500">
            {state.errors.studentId[0]}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ตั้งรหัส PIN (6 หลัก)
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
        {state?.errors?.pin && (
          <p className="mt-1 text-sm text-red-500">{state.errors.pin[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ยืนยันรหัส PIN
        </label>
        <input
          type="password"
          name="confirmPin"
          inputMode="numeric"
          maxLength={6}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C12882] focus:border-transparent outline-none transition-all"
          placeholder="••••••"
          required
        />
        {state?.errors?.confirmPin && (
          <p className="mt-1 text-sm text-red-500">
            {state.errors.confirmPin[0]}
          </p>
        )}
      </div>

      {state?.message && (
        <div
          className="flex justify-center  items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-red-500 text-sm">{state.message}</p>
        </div>
      )}

      <div className="flex items-center justify-end text-sm">
        <button
          type="button"
          onClick={onLoginClick}
          className="text-[#1E6C74] hover:underline font-medium bg-transparent border-none cursor-pointer"
        >
          มีรหัส PIN แล้ว? เข้าสู่ระบบ
        </button>
      </div>
    </AccountModal>
  );
}

"use client";

import { useActionState, useEffect } from "react";
import { changePin } from "@/app/lib/actions";
import AccountModal from "./AccountModal";

export default function ChangePinModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [state, formAction, isPending] = useActionState(changePin, null);

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state, onClose]);

  const input_style =
    "w-full px-4 py-2 rounded-lg border border-gray-300 ring-0 focus:ring-2 focus:ring-[#1E6C74] focus:border-transparent outline-none transition-all";

  return (
    <AccountModal
      title="เปลี่ยนรหัส PIN"
      message="กำหนดรหัส PIN ใหม่ของคุณ"
      cancel="ยกเลิก"
      submit={isPending ? "กำลังบันทึก..." : "ยืนยันการเปลี่ยนรหัส"}
      submit_type="primary"
      action={formAction}
      modal_type="form"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          รหัส PIN เดิม
        </label>
        <input
          type="password"
          name="oldPin"
          inputMode="numeric"
          maxLength={6}
          className={input_style}
          placeholder="••••••"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          รหัส PIN ใหม่ (6 หลัก)
        </label>
        <input
          type="password"
          name="newPin"
          inputMode="numeric"
          maxLength={6}
          className={input_style}
          placeholder="••••••"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ยืนยันรหัส PIN ใหม่
        </label>
        <input
          type="password"
          name="confirmNewPin"
          inputMode="numeric"
          maxLength={6}
          className={input_style}
          placeholder="••••••"
          required
        />
      </div>

      {state?.message && (
        <div
          className="flex h-8 justify-center items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <p
            className={`text-sm ${
              state.success ? "text-green-600" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        </div>
      )}
    </AccountModal>
  );
}

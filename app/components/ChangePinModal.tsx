"use client";

import { useActionState, useEffect } from "react";
import { changePin } from "@/app/lib/actions";
import Modal from "./Modal";

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      style="relative flex flex-col justify-center bg-white rounded-lg max-w-2xl w-full mx-4 pt-6 pb-5 shadow-xl animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="pb-4">
        <p className="text-gray-500 text-center mb-6 mt-1">
          กำหนดรหัส PIN ใหม่ของคุณ
        </p>
        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รหัส PIN เดิม
            </label>
            <input
              type="password"
              name="oldPin"
              inputMode="numeric"
              maxLength={6}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C12882] focus:border-transparent outline-none transition-all"
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C12882] focus:border-transparent outline-none transition-all"
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C12882] focus:border-transparent outline-none transition-all"
              placeholder="••••••"
              required
            />
          </div>

          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {state?.message && (
              <p
                className={`text-sm ${
                  state.success ? "text-green-600" : "text-red-500"
                }`}
              >
                {state.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            aria-disabled={isPending}
            className="w-full bg-[#1E6C74] hover:bg-[#165157] text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? "กำลังบันทึก..." : "ยืนยันการเปลี่ยนรหัส"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

'use client';

import { useActionState } from 'react';
import { register } from '@/app/lib/actions';
import Link from 'next/link';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, null);

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1E6C74] to-[#59A0A8] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50">
        <div className="flex flex-col items-center gap-2 mb-8">
          <h1 className="text-3xl font-bold text-[#1E6C74]">ตั้งรหัส PIN</h1>
          <p className="text-gray-600">สำหรับใช้งานครั้งแรก</p>
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
            {state?.errors?.studentId && (
              <p className="mt-1 text-sm text-red-500">{state.errors.studentId[0]}</p>
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
               <p className="mt-1 text-sm text-red-500">{state.errors.confirmPin[0]}</p>
            )}
          </div>

          <div 
            className="flex items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {state?.message && (
              <p className="text-red-500 text-sm">{state.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end text-sm">
             <Link href="/login" className="text-[#1E6C74] hover:underline font-medium">
               มีรหัส PIN แล้ว? เข้าสู่ระบบ
             </Link>
          </div>

          <button
            type="submit"
            aria-disabled={isPending}
            className="w-full bg-[#1E6C74] hover:bg-[#165157] text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? 'กำลังบันทึก...' : 'บันทึกรหัส PIN'}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { signOut } from "next-auth/react";
import AccountModal from "./AccountModal";

export default function LogoutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const signout_message = [
    "จะออกจริง ๆ หรอ? 😟",
    "ออกแล้วไปไหน? #แสงธรรมจากปลายเทียน #สายลมแห่งปัญญา",
    "อบจากระบอบ? 🥀",
    "ช่วยเดินไปบอกเขาเลยว่าฉันไม่ให้ไป",
  ];

  return (
    <AccountModal
      title="ยืนยันการออกจากระบบ"
      message={signout_message}
      cancel="ยกเลิก"
      submit="ออกจากระบบ"
      submit_type="danger"
      modal_type="normal"
      action={handleLogout}
      isOpen={isOpen}
      onClose={onClose}
    ></AccountModal>
  );
}

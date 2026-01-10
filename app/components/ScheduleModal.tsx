import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function ScheduleModal({ onClose }: { onClose: () => void }) {
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Modal
      style="bg-gray-900 w-1/2 h-11/12 py-8 px-10 flex flex-col items-center justify-between gap-2 rounded-xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <h1 className="text-4xl text-white font-bold">กำหนดการ</h1>
      <iframe src="/schedule.pdf" width={"100%"} height={"100%"}></iframe>
      <p className="text-sm text-amber-400/80 pt-2">
        *กำหนดการอาจมีการเปลี่ยนแปลงได้ตามความเหมาะสม
      </p>
    </Modal>
  );
}

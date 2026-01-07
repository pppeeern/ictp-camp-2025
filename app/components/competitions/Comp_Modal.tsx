import { useEffect, useState } from "react";

import Modal from "../Modal";
import CompRegisModal from "./Comp_Regis_Modal";
import CompDetailModal from "./Comp_Detail_Modal";
import { StudentType } from "../account/AccountData";
import { Session } from "next-auth";

export default function CompModal({
  student,
  comp_index,
  page,
  onClose,
  onSwitch,
  togglePrev,
  toggleNext,
}: {
  student: StudentType | null;
  comp_index: number;
  page: string;
  onClose: () => void;
  onSwitch: () => void;
  togglePrev: () => void;
  toggleNext: () => void;
}) {
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);

  function Arrow({ position }: { position: string }) {
    const is_left = position === "L";
    return (
      <button
        onClick={is_left ? togglePrev : toggleNext}
        className={`absolute top-1/2 rounded-full p-4 w-4 h-4 flex justify-center items-center bg-white hover:bg-gray-200 transition-colors cursor-pointer ${
          is_left ? "-left-15" : "-right-15"
        }`}
      >
        {is_left ? "<" : ">"}
      </button>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      style="relative grid grid-cols-[35%_1fr] justify-center w-3/4 h-3/4 max-h-3/4"
    >
      {page == "regis" ? (
        <CompRegisModal
          student={student}
          comp_index={comp_index}
          onSwitch={onSwitch}
        />
      ) : (
        <CompDetailModal comp_index={comp_index} onSwitch={onSwitch} />
      )}
      <Arrow position="L" />
      <Arrow position="R" />
    </Modal>
  );
}

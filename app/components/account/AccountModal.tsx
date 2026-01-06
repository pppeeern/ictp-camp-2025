"use client";

import Modal from "../Modal";

type AccountModalType = {
  title: string;
  message?: string | string[];
  children?: React.ReactNode;

  cancel?: string;
  submit?: string;
  submit_type?: "primary" | "danger";

  isOpen: boolean;
  onClose: () => void;
} & (
  | { modal_type: "form"; action: (payload: FormData) => void }
  | { modal_type: "normal"; action: () => void }
);

export default function AccountModal({
  title,
  message,
  children,
  cancel,
  submit,
  submit_type,
  isOpen,
  modal_type,
  action,
  onClose,
}: AccountModalType) {
  const button_style =
    "w-full rounded-xl py-3 flex items-center justify-center font-semibold cursor-pointer shadow-lg transition-all duration-100 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      style="flex flex-col items-center justify-between gap-2 bg-white rounded-lg w-xl min-h-30 pt-8 pb-4 transition-all duration-150"
    >
      <div className="flex flex-col gap-2 text-center">
        <p id="modal_title" className="text-3xl font-bold">
          {title}
        </p>
        {message && (
          <p id="modal_message">
            {Array.isArray(message)
              ? message[Math.floor(Math.random() * 9) % message.length]
              : message}
          </p>
        )}
      </div>
      {modal_type === "normal" ? (
        <>
          {children}{" "}
          <div className="pt-4 flex items-center justify-between px-4 w-full gap-2">
            {cancel && (
              <button
                onClick={onClose}
                className={`${button_style} bg-gray-200 hover:bg-gray-300`}
              >
                {cancel}
              </button>
            )}
            <button
              onClick={action}
              className={`${button_style} ${
                submit_type === "primary"
                  ? "bg-[#1E6C74] hover:bg-[#165157]"
                  : "bg-red-600 hover:bg-red-700"
              } text-white`}
            >
              {submit}
            </button>
          </div>
        </>
      ) : (
        <form action={action} className="w-full px-8 flex flex-col gap-4">
          {children}
          <div className="pt-4 flex items-center justify-between w-full gap-2">
            {cancel && (
              <button
                onClick={onClose}
                className={`${button_style} bg-gray-200 hover:bg-gray-300`}
              >
                {cancel}
              </button>
            )}
            <button
              type={"submit"}
              className={`${button_style} ${
                submit_type === "primary"
                  ? "bg-[#1E6C74] hover:bg-[#165157]"
                  : "bg-red-600 hover:bg-red-700"
              } text-white`}
            >
              {submit}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

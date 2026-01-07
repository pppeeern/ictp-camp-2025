import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function LoginFirstModal({ onClose }: { onClose: () => void }) {
  const [activeModal, setActiveModal] = useState<"login" | "register">("login");

  return (
    <div>
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={onClose}
        onRegisterClick={() => setActiveModal("register")}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={onClose}
        onLoginClick={() => setActiveModal("login")}
      />
    </div>
  );
}

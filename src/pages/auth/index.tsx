import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModal = useRecoilValue(authModalState);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 h-screen relative">
      <div className="max-w-7xl mx-auto">
        <Navbar />

        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <img src="/hero.png" alt="" />
        </div>

        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};
export default AuthPage;

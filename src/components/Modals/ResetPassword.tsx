import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import React, { useState, useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

function ResetPassword({}: Props) {
  const [email, setEmail] = useState("");

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const setAuthModalState = useSetRecoilState(authModalState);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await sendPasswordResetEmail(email);
      setAuthModalState({ isOpen: true, type: "login" });

      if (success)
        toast.success("Password reset email send", {
          position: "top-center",
          autoClose: 3000,
        });
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleForgotPassword}>
      <h3 className="text-xl font-medium text-white">Reset Password</h3>

      <p className="text-sm text-zinc-200">
        Forgotten your Password? Enter your e-mail address below and we will
        send you an e-mail allowing you to reset it.
      </p>

      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          name="email"
          id="email"
          className="
      border-2 outline-none sm-text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 g-gray-600 border-gray-500 placeholder:gray-400 text-white bg-gray-600
      "
          placeholder="name@company.com"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-lue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        {sending ? "Sending..." : "Reset Password"}
      </button>
    </form>
  );
}

export default ResetPassword;

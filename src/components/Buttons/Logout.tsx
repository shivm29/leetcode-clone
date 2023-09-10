import React, { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";

type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
  const [signOut, loading, error] = useSignOut(auth);

  const handleLogout = async () => {
    try {
      const success = await signOut();
      //   if (success) alert("Signed Out Successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <button
      onClick={handleLogout}
      className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange group relative"
    >
      <FiLogOut />

      <div className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out max-[1400px]:hidden ">
        <p className="text-sm"> Logout </p>
      </div>
    </button>
  );
};
export default Logout;

import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const router = useRouter();
  const setModalstate = useSetRecoilState(authModalState);

  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleClick = () => {
    setModalstate((prev) => ({ ...prev, type: "register" }));
  };
  const handleForgotClick = () => {
    setModalstate((prev) => ({ ...prev, type: "forgotPassword" }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password)
      return toast.error("please fill all details");

    try {
      const user = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!user) {
        return;
      }

      router.push("/");
      toast.success("Signed in successfully");
    } catch (error: any) {
      toast.error("Invalid Credentials");
    }
  };

  useEffect(() => {
    if (error) toast.error("Invalid Credentials");
  }, [error]);

  console.log(inputs);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleSubmit}>
      <h3 className="text-xl font-medium text-white">Sign in to LeetCode</h3>

      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Email
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          className="
        border-2 outline-none sm-text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 g-gray-600 border-gray-500 placeholder:gray-400 text-white bg-gray-600
        "
          placeholder="name@company.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Password
        </label>
        <input
          onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          className="
        border-2 outline-none sm-text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 g-gray-600 border-gray-500 placeholder:gray-400 text-white bg-gray-600
        "
          placeholder="*********"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-lue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <button className="flex w-full justify-end">
        <a
          href="#"
          className="text-sm block text-brand-orange hover:underline w-full text-right"
          onClick={handleForgotClick}
        >
          Forgot Password?
        </a>
      </button>

      <div className="text-sm font-medium text-gray-300">
        Not Registered? &nbsp;
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={handleClick}
        >
          Create Account
        </a>
      </div>
    </form>
  );
};
export default Login;

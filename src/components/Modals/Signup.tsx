import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "@/firebase/firebase";

type Props = {};

function Signup({}: Props) {
  const setModalstate = useSetRecoilState(authModalState);

  const handleClick = () => {
    setModalstate((prev) => ({ ...prev, type: "login" }));
  };

  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.displayName)
      return alert("Please fill all fields");

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;

      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
      <h3 className="text-xl font-medium text-white">Register to LeetCode</h3>

      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email
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
          htmlFor="displayName"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Display Name
        </label>
        <input
          onChange={handleChangeInput}
          type="displayName"
          name="displayName"
          id="displayName"
          className="
        border-2 outline-none sm-text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 g-gray-600 border-gray-500 placeholder:gray-400 text-white bg-gray-600
        "
          placeholder="Shivam Puri"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Password
        </label>
        <input
          onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          className="
        border-2 outline-none sm-text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 g-gray-600 border-gray-500 placeholder:gray-400 bg-gray-600 text-white
        "
          placeholder="*********"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-lue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        {loading ? "loading..." : "Register"}
      </button>

      <div className="text-sm font-medium text-gray-300">
        Already have an account? &nbsp;
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={handleClick}
        >
          Login
        </a>
      </div>
    </form>
  );
}

export default Signup;

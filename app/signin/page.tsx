"use client";
import { SignInProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import formStyle from "@/styles/formStyle.module.css";
import Link from "next/link";

const SignIn = () => {
  const [data, setData] = useState<SignInProps>({
    usernameOrEmail: "",
    password: "",
  });

  return (
    <div className="flex flex-col w-full h-full bg-base-200 justify-center items-center gap-6">
      <div className="flex flex-col items-center bg-base-100 shadow-xl rounded-lg p-6 w-[85dvw] sm:w-full  sm:max-w-sm">
        <div className="flex flex-col items-center text-center mb-5">
          <Image
            alt="logo"
            src={"/assets/imgs/logo.png"}
            width={75}
            height={50}
          />
          <div className="text-lg font-light mt-2">
            Welcome Back to{" "}
            <span className="font-semibold text-blue-500">Syntax Error</span>
          </div>
        </div>
        <form className={formStyle.form}>
          <div className={formStyle.input_container}>
            <label htmlFor="usernameOrEmail" className="text-sm text-gray-700">
              Email or Username
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              placeholder="Enter your email or username"
              className={formStyle.input}
            />
          </div>

          <div className={formStyle.input_container}>
            <label htmlFor="password" className="text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={formStyle.input}
            />
            <Link
              href="/forgot-password"
              className="text-xs text-blue-500 hover:underline mt-1"
            >
              Forgot your password?
            </Link>
          </div>

          <button type="submit" className={formStyle.submit_btn}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

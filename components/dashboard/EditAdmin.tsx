import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

const EditAdmin = () => {
  const dialogState = useSelector((state: RootState) => state.dialog);
  const data = "";
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center text-center mb-5">
        <Image
          alt="logo"
          src={"/assets/imgs/logo.png"}
          width={75}
          height={50}
        />
        <div className="text-lg font-semibold mt-2 text-white">
          Edit Admin Account
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-wrap">
        <label htmlFor="email" className="font-semibold text-xl">
          Email
        </label>
        <div className="flex flex-wrap justify-between gap-2">
          <input
            type="text"
            placeholder="New Email"
            className="flex-1 p-2 rounded "
          />
          <button
            type="button"
            className="text-white font-semibold bg-blue-600 rounded-lg px-4"
          >
            Update
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="username" className="font-semibold text-xl">
          Username
        </label>
        <div className="flex flex-wrap justify-between gap-2">
          <input
            type="text"
            placeholder="New Username"
            className="flex-1 p-2 rounded "
          />
          <button
            type="button"
            className="text-white font-semibold bg-blue-600 rounded-lg px-4"
          >
            Update
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="password" className="font-semibold text-xl">
          Password
        </label>
        <div className="flex flex-wrap justify-between gap-2">
          <input
            type="text"
            placeholder="New Password"
            className="flex-1 p-2 rounded "
          />
          <button
            type="button"
            className="text-white font-semibold bg-blue-600 rounded-lg px-4"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;

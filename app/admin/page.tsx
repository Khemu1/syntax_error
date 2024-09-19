"use client";
import NewCourse from "@/components/NewCourse";
import Image from "next/image";
import React, { useState } from "react";
export const runtime = "edge";

const Admin = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <div className="admin_dashboard flex h-full relative">
      {/* <button
        className="absolute flex   left-4 top-3 w-[32px] h-[32px]"
        onClick={() => setIsSideBarOpen(true)}
      >
        <Image
          alt="sidebar"
          src={"/assets/icons/sidebar.svg"}
          width={32}
          height={32}
        />
      </button>
      <button className="absolute right-4 top-3 text-white bg-gray-950 font-semibold px-4 py-2 rounded-lg">
        Delete
      </button> */}
      {/* mobile sidebar */}
      <aside
        className={`bg-base-100 aside_mobile ${
          !isSideBarOpen ? "aside_mobile_closed" : ""
        }`}
      >
        <button
          className=" text-white flex justify-center bg-blue-600 mb-5 h-max "
          onClick={() => setIsSideBarOpen(false)}
        >
          Close SideBar
        </button>
        <button className="bg-gray-800">Courses</button>
        <button>New Course</button>
      </aside>
      <section className="bg-base-200 flex-grow  mb-10">
        <NewCourse />
      </section>
    </div>
  );
};

export default Admin;

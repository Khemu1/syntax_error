"use client";
import CourseCards from "@/components/CourseCards";
// import Filter from "@/components/Filter";
// import SearchBar from "@/components/SearchBar";
import React from "react";
export const runtime = "edge";

const Courses = () => {
  return (
    <div className="flex flex-col w-full h-full my-10 px-8">
      <div className="flex w-[90dvw] p-6 bg-base-200 mx-auto items-center shadow-md  rounded-xl">
        {/* <SearchBar />
        <Filter /> */}
      </div>
      <CourseCards />
    </div>
  );
};

export default Courses;

"use client";
import CourseCards from "@/components/CourseCards";
import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";
import { useGetAllCourses } from "@/hooks/course";
import React, { useEffect } from "react";

export const runtime = "edge";

const Courses = () => {
  const {
    loading,
    error,
    data: courses,
    handleGetAllCourses,
  } = useGetAllCourses();

  useEffect(() => {
    handleGetAllCourses();
  }, [handleGetAllCourses]);

  return (
    <div className="flex flex-col w-full h-full my-10 px-8">
      <div className="flex flex-col sm:flex-row items-center gap-3 w-[90dvw] p-6 bg-base-300 mx-auto mb-10 shadow-md rounded-xl">
        <SearchBar />
        <Filter />
      </div>

      {error ? (
        <div className="text-red-500 font-semibold text-xl text-center">
          <p>Error loading courses: {error.message}</p>
        </div>
      ) : (
        <CourseCards loading={loading} courses={courses} />
      )}
    </div>
  );
};

export default Courses;

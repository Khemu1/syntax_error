"use client";
import CourseCards from "@/components/coursePage/CourseCards";
import Filter from "@/components/coursePage/Filter";
import SearchBar from "@/components/coursePage/SearchBar";
import { useGetAllCourses } from "@/hooks/course";
import { PublicCardCourseProps } from "@/types";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { filterBy, filterBySearch } from "@/utils";

export const runtime = "edge";

const Courses = () => {
  const {
    loading,
    error,
    data: courses,
    handleGetAllCourses,
  } = useGetAllCourses();

  const [filteredData, setFilteredData] = useState<PublicCardCourseProps[]>([]); // Filtered data to be displayed
  const searchParams = useSearchParams(); // Hook for accessing query parameters

  // Fetch courses when the component mounts
  useEffect(() => {
    handleGetAllCourses();
  }, [handleGetAllCourses]);

  // Update filteredData based on search query and filter from URL parameters
  useEffect(() => {
    if (courses.length > 0) {
      const searchQuery = searchParams.get("q") || ""; // Get search query from URL
      const sortBy = searchParams.get("sortBy") || "name-asc"; // Get sortBy filter from URL

      const searchedData = filterBySearch(courses, searchQuery); // Apply search
      const finalFilteredData = filterBy(searchedData, sortBy); // Apply filter
      setFilteredData(finalFilteredData);
    }
  }, [courses, searchParams]);

  return (
    <div className="flex flex-1 flex-col w-full h-full my-10 px-8">
      <div className="mx-auto mb-10"></div>
      <div className="flex flex-col sm:flex-row items-center gap-3 w-[90dvw] p-6 bg-base-300 mx-auto mb-10 shadow-md rounded-xl">
        {/* Pass state handlers to SearchBar and Filter */}
        <SearchBar />
        <Filter />
      </div>

      {error ? (
        <div className="text-red-500 font-semibold text-xl text-center">
          <p>Error loading courses: {error.message}</p>
        </div>
      ) : (
        <CourseCards loading={loading} courses={filteredData} />
      )}
    </div>
  );
};

export default Courses;

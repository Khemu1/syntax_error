"use client"; // Ensure this is at the very top of the file
import { useGetCourse } from "@/hooks/course";
import React, { useEffect } from "react";
import Image from "next/image";

export const runtime = "edge";

interface Props {
  params: { id: number };
}

const Course: React.FC<Props> = ({ params: { id } }) => {
  const { loading, data, error, handleGetCourse } = useGetCourse();

  useEffect(() => {
    if (!isNaN(Number(id))) {
      handleGetCourse(id);
    }
  }, [id, handleGetCourse]);

  // Handle loading and errors
  if (loading) {
    return <div className="text-center my-10 text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 my-10">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 my-10 px-6 md:px-12 lg:px-44">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
        {data?.title}
      </h1>

      {/* Course Info */}
      <div className="text-white bg-base-300 p-3 rounded-lg shadow-md transition-all hover:scale-105">
        <h2 className="text-xl font-semibold mb-2">Who Will Be Teaching</h2>
        <div
          className="prose prose-lg mb-6"
          dangerouslySetInnerHTML={{
            __html:
              data?.instructorAndMentorInfo ||
              "<p>No information available.</p>",
          }}
        />
      </div>

      <div className="text-white bg-base-300 p-3 rounded-lg shadow-md transition-all hover:scale-105">
        <h2 className="text-xl font-semibold mb-2">More About the Course</h2>
        <div
          className="prose prose-lg mb-6"
          dangerouslySetInnerHTML={{
            __html: data?.courseInfo || "<p>No information available.</p>",
          }}
        />
      </div>

      {/* Mindmap Image */}
      <div className="text-white">
        <h2 className="text-xl font-semibold mb-2">Course Mind Map</h2>
        {data?.mindmapImage && (
          <div className="flex justify-center mt-10 overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={data.mindmapImage}
              alt="Mindmap"
              width={800} // Set responsive width
              height={600} // Set height accordingly
              className="rounded-2xl object-cover"
            />
          </div>
        )}
      </div>

      {/* Join Button */}
      <div className="flex w-full justify-center mt-8">
        <button className="bg-blue-700 hover:bg-blue-800 transition duration-300 w-[250px] py-2 text-white font-semibold text-xl rounded-lg shadow-md">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default Course;

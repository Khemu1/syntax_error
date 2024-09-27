"use client"; // Ensure this is at the very top of the file
// import { useGetCourse } from "@/hooks/course";
// import React, { useEffect } from "react";
// import Image from "next/image";
export const runtime = "edge";

interface Props {
  params: { id: number };
}

const Course: React.FC<Props> = () => {
  return (
    <div className="flex flex-grow justify-center items-center  text-2xl font-semibold">
      WIP , Stay Tuned
    </div>
  );
  // const { loading, data, error, handleGetCourse } = useGetCourse(id);

  // useEffect(() => {
  //   if (!isNaN(Number(id))) {
  //     handleGetCourse(id);
  //   }
  // }, [id, handleGetCourse]);

  // // Handle loading and errors
  // if (loading && data) {
  //   return <div className="text-center my-10">Loading...</div>;
  // }

  // if (error) {
  //   return (
  //     <div className="text-center text-red-500 my-10">
  //       Error: {error.message}
  //     </div>
  //   );
  // }

  // return (
  //   <div className="flex flex-col gap-5  my-8 px-44">
  //     {/* Title */}
  //     <h1 className="text-white mx-auto">{data?.title}</h1>

  //     {/* Course Image */}
  //     <div className="flex justify-center mb-6 overflow-hidden ">
  //       {data?.courseImage && (
  //         <Image
  //           src={data.courseImage}
  //           alt="Course Image"
  //           width={800}
  //           height={450}
  //           className="w-full max-w-[800px] h-auto shadow-lg rounded-[4rem]"
  //         />
  //       )}
  //     </div>

  //     {/* Course Info (HTML content from TinyMCE) */}
  //     <h1 className="mb-2">Who Will Be Teaching</h1>
  //     <div
  //       className="prose prose-lg max-w-xl text-white font-semibold  mb-6"
  //       dangerouslySetInnerHTML={{
  //         __html:
  //           data?.instructorAndMentorInfo || "<p>No information available.</p>",
  //       }}
  //     />

  //     <h1 className="">More About Course </h1>
  //     <div
  //       className="prose prose-lg max-w-xl text-white font-semibold  mb-6"
  //       dangerouslySetInnerHTML={{
  //         __html: data?.courseInfo || "<p>No information available.</p>",
  //       }}
  //     />

  //     {/* Mindmap Image */}
  //     <h1 className="">Course Mind Map </h1>

  //     {data?.mindmapImage && (
  //       <div className="flex justify-center mt-10 overflow-hidden rounded-[4rem]">
  //         <Image
  //           src={data.mindmapImage}
  //           alt="Mindmap"
  //           width={1000}
  //           height={800}
  //           className="w-full max-w-[1000px] h-auto "
  //         />
  //       </div>
  //     )}
  //     <div className="flex w-full justify-center mt-5">
  //       <button className="bg-blue-700 w-[250px] py-2 text-white font-semibold text-xl rounded-lg">
  //         Join Now
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default Course;

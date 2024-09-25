import { CourseDashboard } from "@/types";
import React from "react";

const Course: React.FC<{ course: CourseDashboard }> = ({ course }) => {
  return (
    <>
      <th scope="row" className="px-6 py-4 font-medium text-white ">
        {course.id}
      </th>
      <td className="px-6 py-4">{course.title}</td>
      <td className="px-6 py-4">{course.price}</td>
      <td className="px-6 py-4">{new Date(course.createdAt).toDateString()}</td>
      <td className="px-6 py-4">
        {course.updatedAt ? new Date(course.updatedAt).toDateString() : null}
      </td>
      <td className="px-6 py-4 text-right">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td>
    </>
  );
};

export default Course;

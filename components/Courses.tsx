import React from "react";
import Course from "./Course";

const Courses = () => {
  return (
    <div className="courses_box">
      <div className="courses_titles">
        <p>Course ID</p>
        <p>Name</p>
        <p>Price</p>
      </div>

      <div className="flex flex-col gap-3 overflow-y-scroll">
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
      </div>
    </div>
  );
};

export default Courses;

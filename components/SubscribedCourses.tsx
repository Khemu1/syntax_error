import React from "react";
import SubscribedCourse from "./SubscribedCourse";

const SubscribedCourses = () => {
  return (
    <div className="courses_box">
      {/* Header Row */}
      <div className="courses_titles">
        <p>Subscription ID</p>
        <p>Name</p>
        <p>Price</p>
      </div>

      {/* Course Rows */}
      <SubscribedCourse />
      <SubscribedCourse />
      <SubscribedCourse />
      <SubscribedCourse />
    </div>
  );
};

export default SubscribedCourses;

"use client";

import { PublicCardCourseProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  course: PublicCardCourseProps;
};
const CourseCard: React.FC<Props> = ({ course }) => {
  return (
    <Link href={`/courses/${course.id}`} className="flex justify-center w-max">
      <div className="rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-2xl bg-base-100 max-w-[250px]">
        <Image
          alt="card"
          src={course.courseImage}
          height={200}
          width={250}
          className="object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white text-nowrap whitespace-nowrap overflow-hidden text-ellipsis">
            {course.title}
          </h2>
          <p className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
            {course.cardDescription ||
              "This is a brief description for the card."}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

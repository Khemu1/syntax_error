import Image from "next/image";
import React from "react";

const CourseCard = () => {
  return (
    <div className="flex justify-center">
      <div className="rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-2xl bg-base-100 max-w-[250px]">
        <Image
          alt="card"
          src={"/assets/cards/testCard.jpg"}
          height={200}
          width={250}
          className="object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white text-nowrap whitespace-nowrap overflow-hidden text-ellipsis">
            Card Title
          </h2>
          <p className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
            This is a brief description for the card.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

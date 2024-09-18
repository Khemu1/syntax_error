import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="m-auto my-10 font-semibold text-xl sm:text-3xl md:text-6xl">
      <h2>404 Page Not Found {":("}</h2>
      <Link
        className="flex w-max mx-auto text-white bg-blue-600 p-2 rounded-lg mt-5"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;

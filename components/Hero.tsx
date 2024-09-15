import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden">
        <Image
          className="rounded-lg shadow-lg object-cover"
          src="/assets/imgs/cover.png"
          alt="Cover"
          priority={true}
          width={1920}
          height={1080}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center z-[10] text-center text-white px-14">
          <h1 className="text-[1.3rem] md:text-5xl font-bold mb-4 fade-in">
            Welcome to Syntax Error
          </h1>
          <div>
            <p
              className="text-xl font-light mb-3 sm:mb-6 fade-in w-full"
              style={{ animationDelay: "0.5s" }}
            >
              Master your coding skills with expert-led courses.
            </p>
          </div>
          <Link
            href={"/courses"}
            className="CTA"
            style={{ animationDelay: "1s" }}
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center py-10 bg-base-200">
        <div className="flex gap-4 items-center">
          <div>
            <Image
              src="/assets/imgs/logo.png"
              alt="Logo"
              width={150}
              height={50}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Who Are We</h1>
            <p className="text-lg mt-2">
              Syntax Error is a team that specializes in giving courses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

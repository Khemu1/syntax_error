"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const Nav = () => {
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 100) {
          navRef.current.classList.add("nav_scrolled");
        } else {
          navRef.current.classList.remove("nav_scrolled");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav ref={navRef}>
      <Link
        className="flex items-center hover:bg-gray-800 p-1 rounded-lg transition-all"
        href={"/"}
      >
        <Image
          src={"/assets/imgs/logo.png"}
          alt={"logo"}
          width={45}
          height={10}
        />
        <span className="font-extrabold text-2xl">Syntax Error</span>
      </Link>
      <ul className="flex gap-5 font-semibold  w-[200px]">
        <li className="nav_buttons">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="nav_buttons">
          <Link href={"/courses"}>Courses</Link>
        </li>
      </ul>
      <div className="flex font-semibold w-[100px]">
        <button type="button" className="nav_buttons">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Nav;

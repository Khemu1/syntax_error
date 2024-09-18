"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current && menuRef.current) {
        if (window.scrollY > 100) {
          navRef.current.classList.add("nav_scrolled");
          menuRef.current.classList.add("nav_menu_scrolled");
        } else {
          navRef.current.classList.remove("nav_scrolled");
          menuRef.current.classList.remove("nav_menu_scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (menuRef.current && window.scrollY > 100) {
      menuRef.current.classList.add("nav_menu_scrolled");
    } else {
      menuRef.current!.classList.remove("nav_menu_scrolled");
    }
  }, [isMenuOpen]);

  return (
    <nav ref={navRef} className="bg-base-300 sticky top-0 z-[15]">
      <Link
        className="flex items-center hover:bg-gray-800 py-1 px-2 rounded-lg gap-2 active:scale-95 transition-all"
        href={"/"}
      >
        <Image
          src={"/assets/imgs/logo.png"}
          alt={"logo"}
          width={45}
          height={10}
        />
        <span className="font-extrabold whitespace-nowrap text-sm md:text-2xl text-white">
          Syntax Error
        </span>
      </Link>
      <div className="hidden sm:flex gap-5 w-auto">
        <ul className="flex gap-5 font-semibold">
          <li className="nav_buttons">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="nav_buttons">
            <Link href={"/courses"}>Courses</Link>
          </li>
          <li className="nav_buttons">
            <Link href={"/admin"}>Admin Dashboard</Link>
          </li>
          <li className="nav_buttons">
            <Link href={"/signin"}>Sign In</Link>
          </li>
        </ul>
        <div className="flex font-semibold"></div>
      </div>
      <div className="sm:hidden flex justify-end w-full relative">
        <button
          className="w-[50px] h-[50px] relative"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <Image alt="nav menu" src={"/assets/icons/menu.svg"} fill={true} />
          <ul
            className={`nav_menu ${isMenuOpen ? "" : "nav_menu_closed"}`}
            ref={menuRef}
          >
            <li onClick={() => setIsMenuOpen(false)}>
              <Link href={"/"}>Home</Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link href={"/courses"}>Courses</Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link href={"/admin"}>Admin Dashboard</Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link href={"/signin"}>Sign In</Link>
            </li>
          </ul>
        </button>
      </div>
    </nav>
  );
};

export default Nav;

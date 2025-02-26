"use client";

import Link from "next/link"
import {usePathname} from "next/navigation"

export const Navigation = () => {
  const currentPath = usePathname();
  return (
    <nav className="flex justify-center">
      <Link href={"/"} className={`${currentPath === "/" ? "underline " : ""} mr-6`}>Home</Link>
      <Link href={"/about"} className={`${currentPath === "/about" ? "underline " : ""} mr-6`}>About</Link>
      <Link href={"/blogs/34"} className={`${currentPath.startsWith("/blogs") ? "underline" : ""}`}>blog 34</Link>
    </nav>
  )
}

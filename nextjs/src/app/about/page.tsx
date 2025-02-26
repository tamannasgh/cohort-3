"use client";
// import Link from "next/link";
import {useRouter} from "next/navigation";

const About = () => {
  const route = useRouter();
  return (
    <div>
      this is about page
      <button onClick={()=> route.push("/")} className="ml-6">goto home</button>
    </div>
  );
};

export default About;

'use client'
import Link from "next/link";
import { Background } from "@/components/background";

export default function Home() {


  return (
    <>
      <div className="flex sm:mt-10 flex-col items-center justify-center h-screen">
        <div className="text-4xl mt-20 font-sans-serif z-20 font-med t rounded-lg p-4 flex items-center justify-center">
          <Link href="/upload">
            Enter
          </Link>
        </div>
        <Background />
      </div>
    </>
  );
}

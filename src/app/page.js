'use client'
import Link from "next/link";
import { Homepage } from "@/components/homepage";
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {


  return (
    <>
      <motion.div layout className="flex overflow-y-auto h-full sm:my-10 lg:my-0 flex-col items-center justify-center ">
        <Homepage /> 
      </motion.div>
    </>
  );
}




{/* <div className="flex flex-col items-center justify-center h-screen">
        <div className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-2xl text-transform: uppercase  font-bold absolute top-20 font-sans-serif z-0 font-med t rounded-lg p-4 flex items-center justify-center">
          Thumbnail Generator
        </div>
        <Background />
        <div className="text-4xl absolute bottom-20 font-sans-serif z-20 font-med t rounded-lg p-4 flex items-center justify-center">
          <Link href="/upload">
            Enter
          </Link>
        </div>
      </div> */}
 {/* <div className="text-4xl mt-20 font-sans-serif z-20 font-med t rounded-lg p-4 flex items-center justify-center">
          <Link href="/upload">
            Enter
          </Link>
        </div> */}
        {/* <Background /> */}
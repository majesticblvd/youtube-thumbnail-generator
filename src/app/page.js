import { Homepage } from "@/components/homepage";
import Link from "next/link";

export default async function Home() {

  // fetch data from this component and pass it to the homepage component
  // to be able to render the content


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <Homepage />  */}
      {/* link to upload page */}
      <div className="text-4xl font-med border-2 border-solid border-gray-200 rounded-lg p-4 flex items-center justify-center bg-slate-900 ">
        <Link href="/upload">
          Enter Thumbnail Generator
        </Link>
      </div>
    </div>
  );
}

import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import YoutubePlayer from "./components/YoutubePlayer";

export default function Home() {
  return (
    <main className="">
      <div className=" bg-yellow-300 dark:bg-yellow-950 flex flex-col md:flex-row justify-between items-center">
        <div className="p-10 flex flex-col ">
          <h1 className="text-5xl font-bold py-10">
            Welcome to VSTECHDrive, <br />
            Your Secure and Efficient Cloud Storage Solution
          </h1>

          <p className="pb-5">
            Unlock the power of seamless file synchronization and secure cloud
            storage with VSTECHDrive. Elevate your digital experience and stay
            connected across devices effortlessly. Whether you're a
            professional, student, or anyone in need of reliable cloud storage,
            VSTECHDrive is your go-to solution.
          </p>

          <Link
            href={"/dashboard"}
            className="flex bg-yellow-600 hover:bg-yellow-400 w-fit p-3"
          >
            Try it for free!
            <ArrowRight className="ml-5" />
          </Link>
        </div>
        <div className="p-10 flex flex-col justify-center grow w-full">
          <YoutubePlayer videoId="Oz-SvGZsTNc" title="Video" />
        </div>
      </div>
    </main>
  );
}

import Image from "next/image";
import face from "@/assets/facescan.png";

export default function Home() {
  return (
    <main className="flex bg-gradient-to-b from-[#363d5a] to-[#020735] h-screen flex-col  ">
      <div className=" flex flex-col items-center w-[90%] mx-auto">
        <Image src={face} width={400} height={400} alt="" />
        <h1 className=" mt-10 mb-8 text-4xl font-semibold">
          Face<span className=" text-blue-400">ID</span>
        </h1>
        <p className=" text-center text-pretty text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, id
          optio assumenda.
        </p>
        <button className=" text-lg font-semibold text-center w-full mt-14 py-3 rounded-md bg-blue-500">
          Get Started
        </button>
      </div>
    </main>
  );
}

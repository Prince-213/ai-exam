import React from "react";
import profile from "@/assets/pexels-jimmy-jimmy-1484806.jpg";
import Image from "next/image";
import WebcamDemo from "@/components/web-cam";

const ProfilePage = () => {
  return (
    <div className=" w-full h-screen py-10 bg-gradient-to-b from-[#363d5a] to-[#020735]">
      
      <div className=" w-[90%] space-y-5  h-full flex justify-center flex-col items-center mx-auto">
        <h2 className=" text-3xl font-semibold text-blue-400">Successfull !</h2>
        <p>Identity Confirmed.. You may proceed with your exam</p>
        <div className=" flex flex-col items-center space-y-5 py-10">
          <div className=" fex rounded-[50%] overflow-hidden w-[10rem] h-[10rem] relative">
            <Image
              src={profile}
              fill
              alt=""
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <h2 className=" text-xl font-semibold text-blue-400">John Smith</h2>
        </div>
        <div className=" w-full gap-y-5 grid grid-cols-2">
          <div className=" space-y-2">
            <p className=" text-white font-semibold text-lg">Name:</p>
            <h2 className=" text-xl font-semibold text-blue-400">John Smith</h2>
          </div>
          <div className=" space-y-2">
            <p className=" text-white font-semibold text-lg">
              Registration Number:
            </p>
            <h2 className=" text-xl font-semibold text-blue-400">112233</h2>
          </div>
          <div className=" space-y-2">
            <p className=" text-white font-semibold text-lg">Department:</p>
            <h2 className=" text-xl font-semibold text-blue-400">
              Social Science
            </h2>
          </div>
          <div className=" space-y-2">
            <p className=" text-white font-semibold text-lg">Faculty:</p>
            <h2 className=" text-xl font-semibold text-blue-400">
              Applied Science
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

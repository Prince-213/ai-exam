"use client";

import React, { useEffect, useState } from "react";
import profile from "@/assets/pexels-jimmy-jimmy-1484806.jpg";
import Image from "next/image";
import WebcamDemo from "@/components/web-cam";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import AnyComponent from "@/components/stt";
import TextToSpeech from "@/components/text-to-speech";

const PassPage = () => {
  const { regNo, passCode, changePassCode } = useStore();

  const route = useRouter();

  const [now, setNow] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>(
    "What is your passcode?"
  );

  useEffect(() => {


    setTimeout(() => {
      console.log("fired");

      setNow(true);


    }, 300);
  }, []);

  return (
    <div className=" w-full h-screen py-10 bg-gradient-to-b from-[#363d5a] to-[#020735]">
      <div className=" w-[90%] space-y-5  h-full flex justify-center flex-col items-center mx-auto">
        <h2 className=" text-3xl font-semibold text-blue-400">
          What is your Passcode{" "}
        </h2>
        <p>Identity Confirmed.. You may proceed with your exam</p>
        <p className=" text-white font-semibold text-xl">RegNo: {regNo}</p>
        <p className=" text-white font-semibold text-xl">
          Passcode: {passCode}
        </p>
        <br />
        <input
          type="text"
          defaultValue={passCode}
          onChange={(e) => changePassCode(e.target.value)}
          className=" p-5 rounded-lg w-[20rem] text-white bg-white/20 border-2"
        />
        <br />
        <button
          onClick={() => {
            route.push("/profile");
          }}
        >
          Next
        </button>
        <TextToSpeech text={question} now={now}  setNow={setNow} />
        <AnyComponent now={true} changeRegNo={changePassCode} />
        <button onClick={() => setNow(true)}>go</button>
      </div>
    </div>
  );
};

export default PassPage;

"use client";

import { useRouter } from "next/router";
import React, { useState } from "react";
import { useStore } from "@/lib/store";

const RegComponent = () => {
  const { regNo, passCode, changeRegNo } = useStore();

  const route = useRouter();

  const [now, setNow] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>(
    "What is your registration number?"
  );

  return (
    <div className=" w-full h-screen py-10 bg-gradient-to-b from-[#363d5a] to-[#020735]">
      <div className=" w-[90%] space-y-5  h-full flex justify-center flex-col items-center mx-auto">
        <h2 className=" text-3xl font-semibold text-blue-400">
          What is your Registration Number{" "}
        </h2>
        <p>Identity Confirmed.. You may proceed with your exam</p>
        <p className=" text-white font-semibold text-xl">RegNo: {regNo}</p>
        <p className=" text-white font-semibold text-xl">
          Passcode: {passCode}
        </p>
        <br />
        <input
          type="text"
          defaultValue={regNo}
          onChange={(e) => changeRegNo(e.target.value)}
          className=" p-5 rounded-lg w-[20rem] text-white bg-white/20 border-2"
        />
        <br />
        <button
          onClick={() => {
            route.push("/pass");
          }}
        >
          Next
        </button>
        {/* <TextToSpeech text={question} now={now}  setNow={setNow} /> */}
      </div>
    </div>
  );
};

export default RegComponent;

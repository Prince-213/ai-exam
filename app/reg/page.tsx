"use client";


import "regenerator-runtime/runtime";
import Image from "next/image";
import face from "@/assets/facescan.png";
import TextToSpeech from "@/components/text-to-speech";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import useStore from "@/lib/store";

export default function VoiceInputForm() {
  const [regNumber, setRegNumber] = useState("");
  const [passcode, setPasscode] = useState("");

  const handleVoiceInput = (setter) => {
    // Check if the browser supports the Web Speech API
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        setter(transcript);
      };

      recognition.onerror = function (event) {
        console.error("Speech recognition error", event.error);
      };

      recognition.onend = function () {
        console.log("Speech recognition ended");
      };

      recognition.start();
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };

  return (
    <div className="  w-full h-screen flex flex-col items-center justify-center">
      <h2 className=" font-semibold text-2xl">Voice Input Form</h2>
      <br />

      <div className=" w-[30%] flex flex-col space-y-2">
        <label htmlFor="regNumber" className=" font-semibold">
          Registration Number:
        </label>
        <input
          type="text"
          id="regNumber"
          value={regNumber}
          className="  border-2 border-black rounded-lg p-3"
          onChange={(e) => setRegNumber(e.target.value)}
        />
        <button
          className=" py-2 px-8 rounded-lg bg-green-500 text-white text-lg font-semibold w-fit"
          onClick={() => handleVoiceInput(setRegNumber)}
        >
          Speak
        </button>
      </div>
      <br />
      <div className=" w-[30%] flex flex-col space-y-2">
        <label htmlFor="passcode" className=" font-semibold">
          Passcode:
        </label>
        <input
          type="text"
          id="passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          className="  border-2 border-black rounded-lg p-3"
        />
        <button
          className=" py-2 px-8 rounded-lg bg-green-500 text-white text-lg font-semibold w-fit"
          onClick={() => handleVoiceInput(setPasscode)}
        >
          Speak
        </button>
      </div>
      <br />
      <button
        className=" py-2 px-8 rounded-lg bg-green-500 text-white text-lg font-semibold w-fit"
        onClick={() => alert(`Reg Number: ${regNumber}, Passcode: ${passcode}`)}
      >
        Submit
      </button>
    </div>
  );
}

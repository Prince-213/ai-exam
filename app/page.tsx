"use client";

import "regenerator-runtime/runtime";
import Image from "next/image";
import face from "@/assets/facescan.png";
import TextToSpeech from "@/components/text-to-speech";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Home() {
  const route = useRouter();

  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<any>("");
  const [go, setGo] = useState("pending");

  const [message, setMessage] = useState("");
  const commands = [
    {
      command: "reset",
      callback: () => resetTranscript(),
    },
    {
      command: "shut up",
      callback: () => setMessage("I wasn't talking."),
    },
    {
      command: "Hello",
      callback: () => setMessage("Hi there!"),
    },

    {
      command: "get started",
      callback: () => getStarted(),
    },
  ];
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  const [text, setText] = useState(
    "hello there i'll be your visual assistant. let's get started with your exam. Please look at the camera so your face will be scanned"
  );

  const handlePlay = async (speech: string) => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(true);
  };

  const getStarted = async () => {
    await handlePlay("");

    new Promise((resolve, reject) => {
      setTimeout(() => {
        route.push("/scan");
      }, 10000);
    });
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  useEffect(() => {
    if (finalTranscript !== "") {
      console.log("Got final result:", finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB",
    });
  };

  return (
    <main className="flex bg-gradient-to-b from-[#363d5a] to-[#020735] h-screen flex-col  ">
      <div className=" flex flex-col items-center w-[70%] mx-auto">
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
        <div>
          <div>
            <span>listening: {listening ? "on" : "off"}</span>
            <div>
              <button type="button" onClick={resetTranscript}>
                Reset
              </button>
              <button type="button" onClick={listenContinuously}>
                Listen
              </button>
              <button type="button" onClick={SpeechRecognition.stopListening}>
                Stop
              </button>
            </div>
          </div>
          <div>{message}</div>
          <div>
            <span>{transcript}</span>
          </div>
        </div>
      </div>
    </main>
  );
}

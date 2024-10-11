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
import ScanComponent from "@/components/scan";

export default function Home() {
  const route = useRouter();

  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<any>("");
  const [go, setGo] = useState("pending");
  const [page, setPage] = useState(0);
  const { regNo, passCode, changeRegNo } = useStore();

  const [message, setMessage] = useState("");
  const commands = [
    {
      command: "reset",
      callback: () => resetTranscript()
    },
    {
      command: "shut up",
      callback: () => setMessage("I wasn't talking.")
    },
    {
      command: "Hello",
      callback: () => setMessage("Hi there!")
    },

    {
      command: "get started",
      callback: () => getStarted()
    }
  ];
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening
  } = useSpeechRecognition({ commands });

  const [text, setText] = useState(
    "hello there i'll be your visual assistant. Provide the necessary information to get started"
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
        route.replace("/reg");
      }, 7000);
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
      language: "en-GB"
    });
  };

  return (
    <div className=" w-full h-screen flex items-center justify-center ">
      <ScanComponent />
    </div>
  );
}

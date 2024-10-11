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

  return (
    <div className=" w-full h-screen flex items-center justify-center ">
      <h1 className=" font-semibold text-3xl text-center">
        Welcome to The Braile System
      </h1>
    </div>
  );
}

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

export default function VoiceProfile() {
  const [regNumber, setRegNumber] = useState("");
  const [passcode, setPasscode] = useState("");

  const route = useRouter();

  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<any>("");

  const [target, setTarget] = useState("none");

  const [message, setMessage] = useState("");
  const commands = [
    {
      command: "reset",
      callback: () => resetTranscript()
    },
    {
      command: "are you listening",
      callback: () => say({ text: "Yes i am listening" })
    },
    {
      command: "shut up",
      callback: () => say({ text: "I was mot talking" })
    },
    {
      command: "hello",
      callback: () => {
        say({ text: "Hi there!" });
      }
    },

    {
      command: "get started",
      callback: () => {
        say({ text: "Exam Starting" });
        route.push("/exam");
      }
    },

    {
      command: "submit",
      callback: async () => {
        await setText("Form submitted");
        say({ text: "Exam Starting" });
        route.push("/exam");
      }
    }
  ];

  const say = ({ text }: { text: string }) => {
    const synth = window.speechSynthesis;
    const greetingText = "It works ";
    const utterance = new SpeechSynthesisUtterance(text);

    // Speak the greeting when the page is opened
    synth.speak(utterance);
  };

  useEffect(() => {
    listenContinuously();
  }, []);

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
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    const greetingText =
      "Welcome to the profile page from the credentials you are Micheal John of Computer Engineering Department say get started to begin your exam";
    const utterance = new SpeechSynthesisUtterance(greetingText);

    // Speak the greeting when the page is opened
    synth.speak(utterance);

    return () => {
      // Clean up the speech synthesis when the component is unmounted
      synth.cancel();
    };
  }, []);

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
      console.log("Got interim result:", interimTranscript);
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
    <div className="  w-full h-screen flex flex-col items-center justify-center">
      <h2 className=" font-semibold text-2xl">Voice Input Form</h2>
      <br />
      <br />

      <div className=" text-black">
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
        <div>{target}</div>
        <div>
          <span>{transcript}</span>
        </div>
      </div>
    </div>
  );
}

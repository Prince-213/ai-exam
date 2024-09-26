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

  const route = useRouter();

  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<any>("");
  const [go, setGo] = useState("pending");
  const [page, setPage] = useState(0);
  const { regNo, passCode, changeRegNo } = useStore();
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
      callback: () => getStarted()
    },
    {
      command: "Set registration number",
      callback: () => {
        say({ text: "Call it out" });
        setText("Please provide a registration number");
        resetTranscript();
        getStarted();
        setRegNumber("");
        handlePlay("");
        setTarget("reg");
      }
    },
    {
      command: "Set passcode",
      callback: () => {
        say({ text: "Call it out" });
        setText("Please provide your passcode");
        resetTranscript();
        setPasscode("");
        handlePlay("");
        setTarget("pass");
      }
    },
    {
      command: "Set pass code",
      callback: () => {
        say({ text: "Call it out" });
        setText("Please provide your passcode");
        resetTranscript();
        setPasscode("");
        handlePlay("");
        setTarget("pass");
      }
    },
    {
      command: "set passcode",
      callback: () => {
        say({ text: "Call it out" });
        setText("Please provide your passcode");
        resetTranscript();
        setPasscode("");
        handlePlay("");
        setTarget("pass");
      }
    },
    {
      command: "set pass code",
      callback: () => {
        say({ text: "Call it out" });
        setText("Please provide your passcode");
        resetTranscript();
        setPasscode("");
        handlePlay("");
        setTarget("pass");
      }
    },
    {
      command: "set registration number",
      callback: () => {
        setText("Please provide a registration number");
        handlePlay("");
      }
    },
    {
      command: "submit",
      callback: async () => {
        await setText("Form submitted");
        await handlePlay("");
        route.push("/profile");
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

  const handleRegNumberChange = (value) => {
    // Use a regular expression to remove all non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");
    setRegNumber(numericValue);
  };

  const handlePassChange = (value) => {
    // Use a regular expression to remove all non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");
    setPasscode(numericValue);
  };
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
    if (target == "reg") {
      setRegNumber(finalTranscript.toLowerCase());
      console.log(interimTranscript);
    } else if (target == "pass") {
      setPasscode(finalTranscript.toLowerCase());
      console.log(interimTranscript);
    }
  }, [finalTranscript, interimTranscript, target]);

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

      <div className=" w-[30%] flex flex-col space-y-2">
        <label htmlFor="regNumber" className=" font-semibold">
          Registration Number:
        </label>
        <input
          type="text"
          id="regNumber"
          value={regNumber}
          className="  border-2 border-black rounded-lg p-3"
          onChange={(e) => handleRegNumberChange(e.target.value)}
        />
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
          onChange={(e) => handlePassChange(e.target.value)}
          className="  border-2 border-black rounded-lg p-3"
        />
      </div>
      <br />
      <button
        className=" py-2 px-8 rounded-lg bg-green-500 text-white text-lg font-semibold w-fit"
        onClick={() => alert(`Reg Number: ${regNumber}, Passcode: ${passcode}`)}
      >
        Submit
      </button>
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

"use client";

import "regenerator-runtime/runtime";
import Image from "next/image";
import TextToSpeech from "@/components/ttts";
import face from "@/assets/facescan.png";
import { v4 as uuidv4 } from "uuid";

import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import { useRouter } from "next/navigation";

import { Suspense, useEffect, useState } from "react";
import useStore from "@/lib/store";
import TTS from "@/components/ttts";
import axios from "axios";

export default function VoiceInputForm({
  params
}: {
  params: { slug: string };
}) {
  const [questionOne, setQuestionOne] = useState("");
  const [questionTwo, setQuestionTwo] = useState("");
  const [score, setScore] = useState(0);

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
      command: "clear",
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
      callback: () => say({ text: "Yeah it works" })
    },
    {
      command: "Get started.",
      callback: () => say({ text: "Yeah it works" })
    },
    {
      command: "Speak.",
      callback: () => say({ text: "Yeah it works" })
    },
    {
      command: "First question.",
      callback: () => {
        say({
          text: "What is the capital of france. First Option. Paris. Second Option. Tokyo"
        });
        resetTranscript();

        setQuestionOne("");

        setTarget("1");
      }
    },
    {
      command: "first question",
      callback: () => {
        say({
          text: "What is the capital of france. First Option. Paris. Second Option. Tokyo"
        });
        resetTranscript();

        setQuestionOne("");

        setTarget("1");
      }
    },
    {
      command: "Second question.",
      callback: () => {
        say({
          text: "What is the Federal Capital territory of Nigeria. First option. Paris. Second option. Abuja"
        });
        resetTranscript();
        setQuestionTwo("");

        setTarget("2");
      }
    },

    {
      command: "second question",
      callback: () => {
        say({
          text: "What is the Federal Capital territory of Nigeria. First option. Paris. Second option. Abuja"
        });
        resetTranscript();
        setQuestionTwo("");

        setTarget("2");
      }
    },

    {
      command: "submit",
      callback: async () => {
        await getScore();
        let theScore = await checkScore();
        say({
          text: `You exam is concluded. You scored ${theScore} out of 2 in the Exam`
        });
        await axios.post("http://localhost:3000/scores", {
          id: uuidv4(),
          reg: params.slug,
          score: score
        });

        route.push("/");
      }
    }
  ];

  const checkScore = (): number => {
    let value = 0;
    const ans = [questionOne, questionTwo];
    const correct = ["paris", "abuja"];

    for (let index = 0; index < correct.length; index++) {
      const element = correct[index];
      const eleans = ans[index];

      if (element == eleans) {
        value++;
      }
    }

    return value;
  };

  const handleQuestionOne = (value: string) => {
    // Use a regular expression to remove all non-numeric characters
    const filteredInput = filterInput(value);
    setQuestionOne(value);
  };

  const handleQuestionTwo = (value: string) => {
    // Use a regular expression to remove all non-numeric characters

    setQuestionTwo(value);
  };
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening
  } = useSpeechRecognition({ commands });

  const [text, setText] = useState("");

  const say = ({ text }: { text: string }) => {
    const synth = window.speechSynthesis;
    const greetingText = "It works ";
    const utterance = new SpeechSynthesisUtterance(text);

    // Speak the greeting when the page is opened
    synth.speak(utterance);
  };

  function filterInput(input: string) {
    // Trim the input to remove any leading or trailing whitespace
    const trimmedInput = input.trim().toLowerCase();

    // Check if the input is "a", "b", "c", or "d"
    if (["a", "b", "c", "d"].includes(trimmedInput)) {
      return trimmedInput; // Return the valid option
    } else {
      return ""; // Return null or an error message if the input is not valid
    }
  }

  useEffect(() => {
    const synth = window.speechSynthesis;
    const greetingText =
      "Welcome to the exam!. There are two questions in this exam. Say the word ASK!!. followed by the question number to attempt the question ";
    const utterance = new SpeechSynthesisUtterance(greetingText);

    // Speak the greeting when the page is opened
    synth.speak(utterance);

    return () => {
      // Clean up the speech synthesis when the component is unmounted
      synth.cancel();
    };
  }, []);

  useEffect(() => {
    if (target == "1") {
      const value = finalTranscript.toLowerCase();
      const onlyNumbers = filterInput(value);
      setQuestionOne(value);
      console.log(interimTranscript);
    } else if (target == "2") {
      const value = finalTranscript.toLowerCase();
      const onlyNumbers = filterInput(value);
      setQuestionTwo(value);
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

  const getScore = (): void => {
    let value = 0;
    const ans = [questionOne, questionTwo];
    const correct = ["paris", "abuja"];

    for (let index = 0; index < correct.length; index++) {
      const element = correct[index];
      const eleans = ans[index];

      if (element == eleans) {
        setScore((value) => value + 1);
      }
    }
  };

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB"
    });
  };

  return (
    <form className="  w-full h-screen flex flex-col items-center justify-center">
      <h2 className=" font-semibold text-2xl">Voice Input Form</h2>
      <br />
      <div className=" w-[30%] flex flex-col space-y-2">
        <label htmlFor="questionOne" className=" font-semibold">
          What is the capital of france:
        </label>
        <input
          type="text"
          id="questionOne"
          value={questionOne}
          className="  border-2 border-black rounded-lg p-3"
          onChange={(e) => handleQuestionOne(e.target.value)}
        />
      </div>
      <br />
      <div className=" w-[30%] flex flex-col space-y-2">
        <label htmlFor="question2" className=" font-semibold">
          What is the federal capital of Nigeria
        </label>
        <input
          type="text"
          id="question2"
          value={questionTwo}
          onChange={(e) => handleQuestionTwo(e.target.value)}
          className="  border-2 border-black rounded-lg p-3"
        />
      </div>
      <br />
      <button
        type="submit"
        className=" py-2 px-8 rounded-lg bg-green-500 text-white text-lg font-semibold w-fit"
      >
        Score is {score}
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
    </form>
  );
}

import React, { useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";

export default function AnyComponent({
  now,
  changeRegNo
}: {
  now: boolean;
  changeRegNo: (value: string) => void;
}) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (now) {
      startSpeechToText();
    } else {
      stopSpeechToText();
    }
  }, []);

  useEffect(() => {
    if (interimResult) changeRegNo(interimResult);
  }, [interimResult]);

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <h1>Recording: {isRecording.toString()}</h1>
      <button
        onClick={() => (isRecording ? stopSpeechToText() : startSpeechToText())}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <ul>{interimResult && <li>{interimResult}</li>}</ul>
    </div>
  );
}

import React, { useEffect } from "react";

const TTS = () => {
  useEffect(() => {
    const synth = window.speechSynthesis;
    const greetingText =
      "Welcome to the website! I hope you have a great time here.";
    const utterance = new SpeechSynthesisUtterance(greetingText);

    // Speak the greeting when the page is opened
    synth.speak(utterance);

    return () => {
      // Clean up the speech synthesis when the component is unmounted
      synth.cancel();
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h1>Hello, User!</h1>
      <p>Enjoy your visit.</p>
    </div>
  );
};

export default TTS;

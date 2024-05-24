export const speak = (text: string) => {
  const synth = window.speechSynthesis;
  const u = new SpeechSynthesisUtterance(text);

  synth.speak(u);
};

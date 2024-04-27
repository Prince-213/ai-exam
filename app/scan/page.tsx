import React from "react";
import Webcam from "react-webcam";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import WebcamDemo from "@/components/web-cam";

const width = 500;
const height = 500;

const ScanPage = () => {
  return (
    <div className=" w-full h-screen py-10 bg-gradient-to-b from-[#363d5a] to-[#020735]">
      <div className=" w-[90%] justify-between h-full flex flex-col items-center mx-auto">
        <div className=" w-[20em] h-[20em] border-4 border-dashed border-emerald-500 rounded-[50%]"></div>
        <p className=" text-center">Scanning...</p>
      </div>
    </div>
  );
};

export default ScanPage;

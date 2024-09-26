import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { useRouter } from "next/navigation";

export default function ScanComponent() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [faceDetected, setFaceDetected] = useState(false);
  const [detectionTime, setDetectionTime] = useState(0);
  const [yeahCount, setYeahCount] = useState(0);
  const router = useRouter();

  // LOAD FROM USEEFFECT
  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  useEffect(() => {
    console.log(yeahCount);
    if (yeahCount >= 15) {
      router.push("test");
    }
  }, [yeahCount]);

  // OPEN YOUR FACE WEBCAM
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // LOAD MODELS FROM FACE API
  const loadModels = () => {
    Promise.all([
      // Load the models from your public/models directory
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")
    ]).then(() => {
      faceMyDetect();
    });
  };

  // FACE DETECTION FUNCTION
  const faceMyDetect = () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      // DRAW THE FACE IN WEBCAM
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650
      });

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

      if (detections.length > 5) {
        console.log("yeh buoy");
      }

      if (detections.length > 0) {
        if (!faceDetected) {
          setFaceDetected(true);
          setDetectionTime(Date.now());
          setYeahCount((prev) => prev + 1);
        } else {
          // If face is detected for 5 seconds, navigate
          // Change to your destination page
          console.log("check");
          setYeahCount((prev) => prev + 1);
        }
      } else {
        setFaceDetected(false);

        setDetectionTime(0);
      }
    }, 1000);
  };

  return (
    <div className="myapp">
      <h1>Face Detection</h1>
      <div className="appvideo">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>
      <canvas ref={canvasRef} width="940" height="650" className="appcanvas" />
    </div>
  );
}

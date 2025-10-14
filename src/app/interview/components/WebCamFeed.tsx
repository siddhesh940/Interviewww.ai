// src/components/WebCamFeed.tsx
"use client";

import React, { useEffect, useRef } from "react";

type WebCamFeedProps = {
  stream: MediaStream | null;
  width?: number;
  height?: number;
  muted?: boolean;
  className?: string;
};

// eslint-disable-next-line react/function-component-definition
const WebCamFeed: React.FC<WebCamFeedProps> = ({
  stream,
  width = 400,
  height = 300,
  muted = true,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    console.log("🔍 WebCamFeed: stream changed:", stream);
    if (videoRef.current && stream) {
      console.log("🎥 Attaching stream to video element:", stream);
      videoRef.current.srcObject = stream;
      
      // Ensure video starts playing
      videoRef.current.play().catch((error) => {
        console.error("❌ Error playing video:", error);
      });
    } else {
      console.log("❌ No stream or video ref available");
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream]);

  return (
    <div className="flex justify-center items-center relative">
      <video
        ref={videoRef}
        muted={muted}
        width={width}
        height={height}
        className={`rounded-xl border border-gray-300 shadow-md object-cover ${className}`}
        controls={false}
        style={{ 
          transform: 'scaleX(-1)', // Mirror the video for natural selfie view
          backgroundColor: '#f3f4f6' // Light gray background
        }}
        autoPlay
        playsInline
      />
      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">📹</div>
            <p className="text-sm">Starting camera...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebCamFeed;

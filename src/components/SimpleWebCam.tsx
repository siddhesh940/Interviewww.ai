"use client";

import { useEffect, useRef } from "react";

interface SimpleWebCamProps {
  stream: MediaStream | null;
  width?: number;
  height?: number;
  className?: string;
  onCameraClick?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function SimpleWebCam({
  stream,
  width = 300,
  height = 220,
  className = "",
  onCameraClick,
  isLoading = false,
  error = null
}: SimpleWebCamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video && stream) {
      console.log("🎥 Setting video stream");
      video.srcObject = stream;
      video.play().catch(console.error);
    } else if (video && !stream) {
      video.srcObject = null;
    }
  }, [stream]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        width={width}
        height={height}
        className={`rounded-xl object-cover bg-gray-100 ${className}`}
        style={{ transform: 'scaleX(-1)' }} // Mirror effect
        autoPlay
        playsInline
        muted
      />
      
      {/* Overlay when no stream */}
      {!stream && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-xl">
          {error ? (
            <div className="text-center text-red-500">
              <div className="text-2xl mb-2">❌</div>
              <p className="text-sm">Camera Error</p>
              <p className="text-xs">{error}</p>
              {onCameraClick && (
                <button
                  className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                  onClick={onCameraClick}
                >
                  Try Again
                </button>
              )}
            </div>
          ) : isLoading ? (
            <div className="text-center text-gray-500">
              <div className="text-3xl mb-2">⏳</div>
              <p className="text-sm">Loading camera...</p>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <div className="text-3xl mb-2">📹</div>
              <p className="text-sm">Camera not started</p>
              {onCameraClick && (
                <button
                  className="mt-2 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                  onClick={onCameraClick}
                >
                  Start Camera
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

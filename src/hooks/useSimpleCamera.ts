"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useSimpleCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    console.log("🎥 Starting camera...");
    setIsLoading(true);
    setError(null);

    try {
      // Simple, direct camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      console.log("✅ Camera stream obtained:", mediaStream);
      streamRef.current = mediaStream;
      setStream(mediaStream);
      setIsLoading(false);
      
      return mediaStream;
    } catch (err) {
      console.error("❌ Camera error:", err);
      setError(err instanceof Error ? err.message : "Camera access failed");
      setIsLoading(false);
      
return null;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setStream(null);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    stream,
    error,
    isLoading,
    startCamera,
    stopCamera
  };
}

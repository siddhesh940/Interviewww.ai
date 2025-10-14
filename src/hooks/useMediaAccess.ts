"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getSavedPermissionChoice, savePermissionChoice } from "../lib/mediaUtils";

export type UseMediaAccessResult = {
  videoStream: MediaStream | null;   // full stream (audio + video)
  audioStream: MediaStream | null;   // sirf audio track (optional)
  permissionState: "idle" | "requesting" | "granted" | "denied" | "error";
  requestMedia: (opts?: { audio?: boolean; video?: boolean }) => Promise<boolean>;
  stopAll: () => void;
  saveChoice: (choice: "always" | "once" | "deny") => void;
};

export default function useMediaAccess(): UseMediaAccessResult {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [permissionState, setPermissionState] =
    useState<UseMediaAccessResult["permissionState"]>("idle");
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
      stopAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestMedia = useCallback(async (opts: { audio?: boolean; video?: boolean } = { audio: true, video: true }): Promise<boolean> => {
    console.log("🎥 Requesting media access with options:", opts);
    setPermissionState("requesting");
    
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("❌ getUserMedia not supported");
        setPermissionState('error');
        
return false;
      }

      const constraints: MediaStreamConstraints = {};
      if (opts.video) {
        constraints.video = { 
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: 'user'
        };
      }
      if (opts.audio) {
        constraints.audio = {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        };
      }

      console.log("📹 Getting user media with constraints:", constraints);
      let stream: MediaStream;
      
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (error) {
        console.log("⚠️ Full constraints failed, trying simplified constraints...");
        const simpleConstraints: MediaStreamConstraints = {};
        if (opts.video) {
          simpleConstraints.video = true;
        }
        if (opts.audio) {
          simpleConstraints.audio = true;
        }
        stream = await navigator.mediaDevices.getUserMedia(simpleConstraints);
      }
      
      console.log("✅ Got media stream:", stream);
      console.log("📊 Video tracks:", stream.getVideoTracks().length);
      console.log("🎵 Audio tracks:", stream.getAudioTracks().length);
      
      if (mounted.current) {
        setVideoStream(stream);
        setPermissionState('granted');
        console.log("🎉 Media access granted and stream set");
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error getting user media:', error);
      if (mounted.current) {
        setPermissionState('denied');
      }
      
return false;
    }
  }, []);

  function stopAll() {
    if (videoStream) {
      videoStream.getTracks().forEach((t) => t.stop());
      setVideoStream(null);
    }
    if (audioStream) {
      audioStream.getTracks().forEach((t) => t.stop());
      setAudioStream(null);
    }
  }

  function saveChoice(choice: "always" | "once" | "deny") {
    savePermissionChoice(choice);
  }

  useEffect(() => {
    const saved = getSavedPermissionChoice();
    if (saved === "always") {
      requestMedia({ audio: true, video: true }).catch(() => {});
    }
  }, [requestMedia]);

  return {
    videoStream,   // full stream (video + audio)
    audioStream,   // optional: sirf audio
    permissionState,
    requestMedia,
    stopAll,
    saveChoice,
  };
}

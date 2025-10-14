// src/app/interview/InterviewScreen.tsx
"use client";

import useMediaAccess from "@/hooks/useMediaAccess";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PermissionPopup from "./components/PermissionPopup";
import WebCamFeed from "./components/WebCamFeed";

export default function InterviewScreen() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { videoStream, stopAll } = useMediaAccess();
  const router = useRouter();

  // cleanup when unmount
  useEffect(() => {
    return () => {
      stopAll();
    };
  }, [stopAll]);

  // tab visibility detection (optional)
  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState !== "visible") {
        console.warn("User switched tab");
        // TODO: cheating detection (optional)
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    
return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Step 1: show custom permission popup
  if (!permissionGranted) {
    return <PermissionPopup onProceed={() => setPermissionGranted(true)} />;
  }

  // Step 2: after permission, show webcam preview
  return (
    <div className="p-6">
      <div className="max-w-screen-lg mx-auto border-2 rounded-lg p-6">
        <div className="flex gap-6">
          {/* Interviewer */}
          <div className="flex-1">
            <h2 className="text-xl font-bold">Interviewer</h2>
            <div className="mt-6">
              <div className="w-40 h-40 rounded-full bg-slate-100 flex items-center justify-center">
                👨‍💼
              </div>
            </div>
          </div>

          {/* Candidate */}
          <div className="flex-1">
            <h2 className="text-xl font-bold">You</h2>
            <div className="mt-4 h-64 border-8 border-green-300 rounded-lg overflow-hidden">
              <WebCamFeed stream={videoStream ?? null} />
            </div>
            <div className="mt-4 flex gap-3">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => {
                  stopAll();
                  router.push("/interview"); // adjust as per flow
                }}
              >
                End Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

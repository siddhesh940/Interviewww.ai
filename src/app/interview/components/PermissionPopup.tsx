// src/components/PermissionPopup.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useMediaAccess from "@/hooks/useMediaAccess";
import { useState } from "react";

type Props = {
  onProceed: () => void; // callback jab user allow karke aage badhe
};

export default function PermissionPopup({ onProceed }: Props) {
  const { requestMedia, saveChoice, permissionState } = useMediaAccess();
  const [error, setError] = useState<string | null>(null);

  async function handleChoice(choice: "always" | "once" | "deny") {
    setError(null);

    if (choice === "deny") {
      saveChoice("deny");
      setError("You denied camera/microphone access. Interview cannot continue.");
      
return;
    }

    saveChoice(choice);

    // ✅ Yahin par request karenge
    const ok = await requestMedia({ audio: true, video: true });
    if (ok) {
      onProceed(); // move to interview screen
    } else {
      setError("Unable to access camera or microphone. Please check permissions.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="p-6 text-center space-y-4">
          <h2 className="text-xl font-semibold">Interview Permissions</h2>
          <p className="text-gray-600 text-sm">
            To start your interview, we need access to your{" "}
            <strong>Camera</strong> and <strong>Microphone</strong>.
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col gap-2 mt-4">
            <Button onClick={() => handleChoice("once")}>Allow Once</Button>
            <Button variant="outline" onClick={() => handleChoice("always")}>
              Allow Always
            </Button>
            <Button variant="destructive" onClick={() => handleChoice("deny")}>
              Deny
            </Button>
          </div>

          <div className="mt-4">
            {permissionState === "requesting" && (
              <p className="text-blue-500 text-sm">Requesting permissions...</p>
            )}
            {permissionState === "granted" && (
              <p className="text-green-500 text-sm">Permissions granted!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

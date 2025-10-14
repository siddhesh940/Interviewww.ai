// src/lib/mediaUtils.ts

export const PERMISSION_KEY = "interview_camera_permission"; 
// Possible values: "always" | "once" | "deny" | undefined

export function savePermissionChoice(choice: "always" | "once" | "deny"): void {
  if (typeof window === "undefined") {return;} // Prevent SSR crash

  if (choice === "always") {
    localStorage.setItem(PERMISSION_KEY, "always");
  } else if (choice === "once") {
    sessionStorage.setItem(PERMISSION_KEY, "once");
  } else {
    localStorage.removeItem(PERMISSION_KEY);
    sessionStorage.removeItem(PERMISSION_KEY);
  }
}

export function getSavedPermissionChoice(): "always" | "once" | null {
  if (typeof window === "undefined") {return null;} // Prevent SSR crash

  if (localStorage.getItem(PERMISSION_KEY) === "always") {return "always";}
  if (sessionStorage.getItem(PERMISSION_KEY) === "once") {return "once";}
  
return null;
}

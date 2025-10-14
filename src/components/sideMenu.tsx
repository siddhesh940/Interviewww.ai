"use client";

import { Mic, PlayCircle, Speech } from "lucide-react"; // 🟢 fixed names
import { usePathname, useRouter } from "next/navigation";

function SideMenu() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="z-[10] bg-slate-100 p-6 w-[200px] fixed top-[64px] left-0 h-full">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col justify-between gap-2">
          
          {/* ---- Interviews ---- */}
          <div
            className={`flex flex-row p-3 rounded-md hover:bg-slate-200 cursor-pointer ${
              pathname.endsWith("/dashboard") || pathname.includes("/interviews")
                ? "bg-indigo-200"
                : "bg-slate-100"
            }`}
            onClick={() => router.push("/dashboard")}
          >
            <PlayCircle className="font-thin mr-2" />
            <p className="font-medium">Interviews</p>
          </div>

          {/* ---- Interviewers ---- */}
          <div
            className={`flex flex-row p-3 rounded-md hover:bg-slate-200 cursor-pointer ${
              pathname.endsWith("/interviewers")
                ? "bg-indigo-200"
                : "bg-slate-100"
            }`}
            onClick={() => router.push("/dashboard/interviewers")}
          >
            <Speech className="font-thin mr-2" />
            <p className="font-medium">Interviewers</p>
          </div>

          {/* ---- Soft Skills ---- */}
          <div
            className={`flex flex-row p-3 rounded-md hover:bg-slate-200 cursor-pointer ${
              pathname.includes("/soft-skills")
                ? "bg-indigo-200"
                : "bg-slate-100"
            }`}
            onClick={() => router.push("/soft-skills")}
          >
            <Mic className="font-thin mr-2" />
            <p className="font-medium">Soft Skills</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SideMenu;

"use client";

import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import SideMenu from "@/components/sideMenu";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Interview.ai",
  description: " AI-powered Interviews",
  openGraph: {
    title: "Interview.ai",
    description: "AI-powered Interviews",
    siteName: "Interview.ai",
    images: [
      {
        url: "/interviewai.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/browser-client-icon.ico" />
      </head>
      <body
        className={cn(
          inter.className,
          "antialiased overflow-hidden min-h-screen",
        )}
      >
        <ClerkProvider
          signInFallbackRedirectUrl={"/dashboard"}
          afterSignOutUrl={"/sign-in"}
        >
          <Providers>
            {!pathname.includes("/sign-in") &&
              !pathname.includes("/sign-up") && <Navbar />}
            <div className="flex flex-row h-screen">
              {!pathname.includes("/sign-in") &&
                !pathname.includes("/sign-up") && <SideMenu />}
              <div className="ml-[200px] pt-[64px] h-full overflow-y-auto flex-grow">
                {children}
              </div>
            </div>
            <Toaster
              toastOptions={{
                classNames: {
                  toast: "bg-white",
                  title: "text-black",
                  description: "text-red-400",
                  actionButton: "bg-indigo-400",
                  cancelButton: "bg-orange-400",
                  closeButton: "bg-white-400",
                },
              }}
            />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}

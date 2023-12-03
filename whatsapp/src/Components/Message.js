"use client";
import LoginDialog from "./account/LoginDialog";
import { signOut, useSession } from "next-auth/react";
import ChatDialog from "./chat/chatDiaglog";

export default function Message() {
  const { data: session, status } = useSession();
  console.log(session);

  return (
    <>
      {status === "authenticated" ? (
        <div className="h-[100vh] bg-[#DCDCDC]">
          <header className="bg-primary p-4 h-[200px] shadow-none">
            <div className="container mx-auto flex justify-between items-center">
              {/* Logo */}
              <a href="#" className="text-white text-xl font-bold">
                Your Logo
              </a>
                <ChatDialog/>
              {/* Navigation Menu */}
            </div>
          </header>
        </div>
      ) : (
        <div className="h-[100vh] bg-[#DCDCDC]">
          <header className="bg-primary p-4 h-[150px] shadow-none">
            <a href="#" className="text-white text-xl font-bold">
              Your Logo
            </a>
          </header>
          <LoginDialog />
        </div>
      )}
    </>
  );
}

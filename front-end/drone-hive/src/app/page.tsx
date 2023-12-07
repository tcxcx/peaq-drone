'use client';

import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useWalletStore from "@/hooks/context/useWalletStore";
import { ExitIcon } from "@radix-ui/react-icons";
import Button from "@/components/UI/Button"; // Assuming this is your button component

export default function Home() {
  const router = useRouter();
  const { walletAddress, jwtToken, clearWallet } = useWalletStore();

  const handleSignOut = () => {
    clearWallet();
    router.push("/");
  };

  const handleGoToDashboard = () => {
    router.push("/marketplace");
  };

  const handleGoToLogin = () => {
    router.push("/log-in");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-ribbon font-bold">src/app/page.tsx</code>
        </p>
      
      {/* Check if user is logged in or not and display appropriate options */}
      {walletAddress && jwtToken ? (
        <div className="flex items-center space-x-4">
          <Button text="Go to Dashboard" onClick={handleGoToDashboard} />
          <ExitIcon onClick={handleSignOut} className="cursor-pointer" />
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Button text="Log In" onClick={handleGoToLogin} />
        </div>
      )}
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-indigo-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        {/* <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* Additional content can go here */}
      </div>
    </main>
  );
}

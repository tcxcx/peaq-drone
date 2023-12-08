"use client";

import React from "react";
import useWalletStore from "@/hooks/context/useWalletStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from '@/components/Dashboard/Sidebar';
import Identicon from "@polkadot/react-identicon";
import truncateMiddle from "truncate-middle";
import { ExitIcon } from "@radix-ui/react-icons";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { walletAddress, jwtToken, clearWallet } = useWalletStore();

  useEffect(() => {
    // Redirect if not authenticated
    if (!walletAddress || !jwtToken) {
      router.push("/");
    }
  }, [walletAddress, jwtToken, router]);

  const handleSignOut = () => {
    clearWallet(); // Clears the wallet state
    router.push('/log-in'); // Redirects the user to the login page
  };

  return (
    <>
      <div className="flex flex-row h-screen">
        {/* Left panel component */}
        <div className="bg-zinc-900/5 glassmorphism">
          <Sidebar />
        </div>

    {/* Right panel component */}
    <div className="flex-1 overflow-auto relative bg-zinc-900/10 z-10">
          <div className="absolute -z-10 inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(180deg,black,transparent)]"></div>
          <div className="container mx-auto p-4">
            <header className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-ribbon uppercase">Marketplace Dashboard</h1>
              {walletAddress && (
                <div className="flex items-center font-ribbon">
                  <Identicon value={walletAddress} size={32} theme="polkadot" />
                  <span className="text-base ml-2">{truncateMiddle(walletAddress, 5, 5, "...")}</span>
                  <ExitIcon onClick={handleSignOut} className="ml-2 cursor-pointer" />
                </div>
              )}
            </header>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
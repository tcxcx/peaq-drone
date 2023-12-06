'use client';

import React, { useEffect, useState } from "react";
import truncateMiddle from "truncate-middle";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import Identicon from "@polkadot/react-identicon";
import { CopyIcon, ExitIcon } from "@radix-ui/react-icons";
import { useProtectedService } from "@/hooks/JWT/useProtectedService";
import Button from "@/components/UI/Button";
import { Skeleton } from "@/components/UI/skeleton";
import { copyToClipboard } from "@/libs/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


type Props = {
  account: InjectedAccountWithMeta;
  jwtToken: string;
  onSignOut: () => void;
};

export const Profile: React.FC<Props> = ({ account, jwtToken, onSignOut }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { loading } = useProtectedService();

  useEffect(() => {
    // Replace this with your actual logic to check JWT token and account
    const jwtToken = localStorage.getItem('jwtToken'); // Example, store and retrieve JWT token securely
    const account = localStorage.getItem('account'); // Example, store and retrieve account securely

    if (!jwtToken || !account) {
      // Redirect to login if not authenticated
      router.push('/log-in');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const goToDashboard = () => {
    if (jwtToken && account) {
      // Navigate to the /marketplace route
      router.push('/marketplace');
    } else {
      toast.error("You need to be signed in to access the dashboard.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Identicon value={account.address} size={32} theme="polkadot" />
          <div className="flex flex-col">
            <div className="text-white/90 hover:text-basement-white font-bold text-lg font-ribbon">{account.meta.name}</div>
            <div className="text-stone-500 text-xs font-ribbon">
              {truncateMiddle(account.address, 5, 5, "...")}
            </div>
          </div>
        </div>

        <ExitIcon onClick={onSignOut} className="z-10 cursor-pointer" />
      </div>
      <p className="text-basement-tone-purple  mt-4 text-2xl uppercase font-ribbon animate-pulse text-right">
        Access granted
      </p>
      <p className="text-stone-200/60 mt-4 text-xl uppercase font-ribbon text-center">
        Welcome to{" "}
        <span className="text-basement-tone-purple hover:text-basement-white font-bold">Drone Hive</span>{" "}
      </p>
      <p className="text-stone-200 mt-4 text-sm">
        You are securely signed in with your Polkadot account.
        <br />
        Now you can go to the dashboard.
      </p>

      <div className="grid gap-3 mt-4">
        <div className="text-center items-center justify-center mt-4">
          <Button text="Go to Dashboard" onClick={goToDashboard} />
        </div>
      </div>

    </div>
  );
};

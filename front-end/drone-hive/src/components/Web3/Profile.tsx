"use client";

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
import useWalletStore from "@/hooks/context/useWalletStore";

type Props = {
  account: InjectedAccountWithMeta;
  jwtToken: string; 
  onSignOut: () => void;
};

export const Profile: React.FC<Props> = ({ account, onSignOut }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { walletAddress, jwtToken, clearWallet } = useWalletStore();

  const { loading } = useProtectedService();

  useEffect(() => {
    if (!jwtToken || !walletAddress) {
      router.push("/log-in");
    }
  }, [jwtToken, walletAddress, router]);

  const handleSignOut = () => {
    clearWallet();
    onSignOut();
  };

  const goToDashboard = () => {
    if (jwtToken && account) {
      // Navigate to the /marketplace route
      router.push("/marketplace");
    } else {
      toast.error("You need to be signed in to access the dashboard.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-basement-tone-purple rounded-md">
        <div className="flex items-center gap-4 z-10">
          <Identicon value={account.address} size={32} theme="polkadot" />
          <div>
            <div className="text-white font-bold">{account.meta.name}</div>
            <div className="text-stone-400 text-xs">
              {truncateMiddle(account.address, 5, 5, "...")}
            </div>
          </div>
        </div>
        <ExitIcon
          onClick={onSignOut}
          className="cursor-pointer text-white z-10"
        />
      </div>
      <div className="mt-4 p-4 bg-white/5 rounded-md shadow my-4">
        <div className="py-4">
          <h2 className="text-lg text-basement-indigo text-center font-semibold font-ribbon uppercase animate-pulse">
            Access Granted
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Welcome to <span className="font-ribbon uppercase">Drone Hive</span>
            . You are securely signed in with your Polkadot account.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Now you can go to the dashboard.
          </p>
        </div>
      </div>
      <div className="flex mt-2 justify-center">
        <Button text="Go to Dashboard" onClick={goToDashboard} />
      </div>
    </div>
  );
};

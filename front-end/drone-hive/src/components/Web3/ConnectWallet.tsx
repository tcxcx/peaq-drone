"use client";

import { useState } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { ButtonRight } from "../UI/ButtonRight";
import { useRouter } from "next/navigation";

type Props = {
  onAccounts: (accounts: InjectedAccountWithMeta[]) => void;
};

export const ConnectWallet: React.FC<Props> = ({ onAccounts }) => {
  const [connecting, setConnecting] = useState(false);
  const router = useRouter();

  const handleConnectWallet = async () => {
    setConnecting(true);
    // dynamically imported because @polkadot/extension-dapp does not support getting imported in SSR
    const { web3Enable, web3Accounts } = await import(
      "@polkadot/extension-dapp"
    );
    try {
      const extensions = await web3Enable(
        "Sign-In with your Substrate Account"
      );

      if (extensions.length === 0) {
        onAccounts([]);
      } else {
        const accounts = await web3Accounts();
        onAccounts(accounts);
      }
    } catch (e) {
    } finally {
      setConnecting(false);
    }
  };

  const ForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center z-1 h-full">
        <p className="text-white text-lg font-ribbon uppercase animate-pulse">
          Sign in here
        </p>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Connect your Substrate-based wallet to continue.
        </p>
        <ButtonRight
          onClick={handleConnectWallet}
          disabled={connecting}
          text="Connect Wallet"
          stateText="Connecting wallet..."
        />
      </div>
      <div className="justify-center text-center z-10">
        <h1
          onClick={ForgotPassword}
          className="font-ribbon uppercase text-basement-green hover:underline z-10 cursor-pointer"
        >
          Forgot your password?
        </h1>
      </div>
    </>
  );
};

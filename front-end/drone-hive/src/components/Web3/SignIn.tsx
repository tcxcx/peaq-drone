import { useState } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Address, SiwsMessage } from "@talismn/siws";
import { Account } from "./Account";
import { SIWS_DOMAIN } from "@/libs/constants";
import { toast } from "sonner";
type Props = {
  accounts: InjectedAccountWithMeta[];
  onCancel: () => void;
  onSignedIn: (account: InjectedAccountWithMeta, jwtToken: string) => void;
};

export const SignIn: React.FC<Props> = ({ accounts, onCancel, onSignedIn }) => {
  // auto select if only 1 account is connected
  const [selectedAccount, setSelectedAccount] = useState<
    InjectedAccountWithMeta | undefined
  >(accounts.length === 1 ? accounts[0] : undefined);
  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = async () => {
    try {
      if (!selectedAccount) throw new Error("No account selected!");

      const address = await Address.fromSs58(selectedAccount.address ?? "");
      if (!address)
        throw new Error(
          "Invalid address: Your address is not a valid Substrate address."
        );
      setSigningIn(true);
      // request nonce from server
      const nonceRes = await fetch("/api/nonce");
      const data = await nonceRes.json();
      const { nonce } = data;

      const siwsMessage = new SiwsMessage({
        domain: SIWS_DOMAIN,
        uri: SIWS_DOMAIN,
        // use prefix of Agung Testnet
        address: address.toSs58(9990),
        nonce,
        statement: "Connect to Peaq Network's testnet - Agung",
        chainName: "Polkadot",
        // expires in 15 mins
        expirationTime: new Date().getTime() + 15 * 60 * 1000,
      });

      const { web3FromSource } = await import("@polkadot/extension-dapp");
      const injectedExtension = await web3FromSource(
        selectedAccount.meta.source
      );
      const signed = await siwsMessage.sign(injectedExtension);

      const verifyRes = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({ ...signed, address: address.toSs58(0) }),
      });
      const verified = await verifyRes.json();
      if (verified.error) throw new Error(verified.error);

      // Hooray we're signed in!
      onSignedIn(selectedAccount, verified.jwtToken);
    } catch (e: any) {
      toast.error("Error:", {
        description:
          "Uh oh! Couldnt sign in. An error occurred. please, try again.",
        duration: 5000,
        action: {
          label: "Try Again",
          onClick: () => {
            handleSignIn;
          },
        },
      });
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="h-full flex flex-1 flex-col">
      <p className="text-white text-lg font-ribbon uppercase">Sign In</p>
      <p className="text-stone-500">Select an account to sign in with.</p>
      <div className="my-4 flex flex-col h-full overflow-y-auto gap-3 p-2 rounded-lg border border-stone-800">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <Account
              key={account.address}
              account={account}
              selected={selectedAccount?.address === account.address}
              onSelect={() => {
                setSelectedAccount(account);
              }}
            />
          ))
        ) : (
          <p className="text-stone-500 text-center mt-4">
            No account connected.
            <br />
            Connect at least 1 account to sign in with.
            <br />
            Visit{" "}
            <a
              href="https://polkadot.js.org/extension/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-basement-purple hover:text-basement-indigo"
            >
              polkadot.js
            </a>{" "}
            or{" "}
            <a
              href="https://talisman.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-basement-purple hover:text-basement-indigo"
            >
              talisman.com
            </a>{" "}
            to get a browser extension wallet
            <br />
            Remember to keep your seed phrase secret at all times.
          </p>
        )}
      </div>
      <div className="flex justify-end items-center gap-4 z-10">
        <button
          onClick={onCancel}
          className="bg-transparent border  border-basement-purple hover:bg-basement-purple hover:animate-pulse text-white font-bold py-2 px-4 rounded uppercase font-ribbon text-sm"
        >
          Cancel
        </button>

        <button
          disabled={!selectedAccount || signingIn}
          onClick={handleSignIn}
          className={`bg-transparent border border-basement-purple ${
            !selectedAccount || signingIn
              ? "opacity-50 cursor-not-allowed"
              : "border-basement-purple  hover:animate-pulse hover:bg-basement-purple"
          } text-white font-bold py-2 px-4 rounded uppercase font-ribbon text-sm`}
        >
          {signingIn ? "Signing In..." : "Sign In"}
        </button>
      </div>
    </div>
  );
};

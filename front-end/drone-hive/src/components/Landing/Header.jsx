"use client";

import { useState } from "react";
import { AlignJustify, LogOut, X } from "lucide-react";
import { SectionWrapper } from "@/components/UI/Section";
import { Logo } from "@/components/Landing/Logo";
import { useRouter } from "next/navigation";
import useWalletStore from "@/hooks/context/useWalletStore";

const links = [
  {
    title: "Overview",
    url: "#overview",
  },
];

function Navigation() {
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
    <div className="ml-auto hidden items-center gap-8 lg:flex font-ribbon uppercase">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className="inline-block text-sm text-white/75 transition hover:text-white"
        >
          {link.title}
        </a>
      ))}
      {walletAddress && jwtToken ? (
        <div className="flex items-center space-x-4">
          <a
            className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur transition duration-300 hover:bg-white/15 cursor-pointer"
            onClick={handleGoToDashboard}
          >
            Go to Dashboard
          </a>
          <LogOut onClick={handleSignOut} className="cursor-pointer" />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <a
            className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur transition duration-300 hover:bg-white/20 uppercase font-ribbon cursor-pointer"
            onClick={handleGoToLogin}
          >
            Log In
          </a>
        </div>
      )}
    </div>
  );
}

function MobileMenu({ showMenu }) {
  return (
    showMenu && (
      <div className="py-4">
        <ul className="flex flex-col items-center space-y-4">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                className="inline-block text-base font-medium text-white/75 transition hover:text-white"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-zinc-950/30 backdrop-blur-lg">
      <SectionWrapper>
        <header>
          <nav className="flex items-center justify-between py-4">
            <div>
              <a href="#" className="inline-flex items-center gap-2">
                <Logo className="text-lg font-normal lg:text-2xl" />
              </a>
            </div>

            <Navigation />

            <button
              onClick={() => setShowMenu(!showMenu)}
              type="button"
              className="relative ml-auto inline-flex lg:hidden"
            >
              <AlignJustify
                className={`h-6 w-6 transition duration-500 ${
                  showMenu ? "rotate-180 opacity-0" : ""
                }`}
              />
              <X
                className={`absolute inset-0 h-6 w-6 transition duration-500 ${
                  showMenu ? "" : "-rotate-180 opacity-0"
                }`}
              />
            </button>
          </nav>
        </header>
        <MobileMenu showMenu={showMenu} />
      </SectionWrapper>
    </div>
  );
}

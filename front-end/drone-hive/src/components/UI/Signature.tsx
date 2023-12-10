import React from "react";
import { Snail } from "lucide-react";

export function Signature() {
  const currentYear = new Date().getFullYear();

  return (
    <div className='group text-center'>
      <a
        href="https://tcxcx.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Snail 
          className="h-20 w-20 mx-auto fill-green-400/10 stroke-[1] text-basement-green mb-4 transition-transform duration-300 group-hover:scale-x-[-1] group-hover:text-basement-purple"
        />
        <p className="text-xs font-ribbon uppercase pb-6 group-hover:text-basement-green">
          © {currentYear} This webpage was created by @tcxcx. All rights reserved.
        </p>
      </a>
    </div>
  );
}

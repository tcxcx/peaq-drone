// ReusableButton.tsx
import React from "react";

type ButtonRightProps = {
  onClick: () => void;
  disabled: boolean;
  text: string;
  stateText: string;
};

export const ButtonRight: React.FC<ButtonRightProps> = ({
  onClick,
  disabled,
  text,
  stateText,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className="font-ribbon text-blue-950 uppercase">
      <a className="group relative inline-block overflow-hidden border rounded-lg border-indigo-600 px-8 py-3 focus:outline-none focus:ring ">
        <span className="absolute inset-y-0 right-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500 duration-300 ease-in-out"></span>
        <span className="relative text-lg text-indigo-600 transition-colors group-hover:text-white">
          {disabled ? stateText : text}
        </span>
      </a>
    </button>
  );
};
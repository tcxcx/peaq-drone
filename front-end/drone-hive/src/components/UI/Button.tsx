import { SpotlightButton } from "./SpotlightButton";
import React, { ReactNode } from 'react';

type ButtonProps = {
    text?: string; // Make text optional
    icon?: ReactNode; // Add an icon prop
    onClick: () => void;
    disabled?: boolean;
};
export default function Button({ text, icon, onClick, disabled }: ButtonProps) {
    return (
        <div className="mx-auto flex w-screen max-w-xl items-center justify-center group">
        <SpotlightButton onClick={onClick} disabled={disabled}>
            {icon && <div className="icon-container">{icon}</div>}
            {text && (
                <span className={`relative mt-px uppercase group-hover:text-basement-tone-purple bg-gradient-to-b from-white/25 to-white bg-clip-text font-ribbon text-lg  text-transparent transition-all duration-200 ${disabled ? 'disabled-styles' : ''}`}>
                    {text}
                </span>
            )}
        </SpotlightButton>
    </div>
    );
}
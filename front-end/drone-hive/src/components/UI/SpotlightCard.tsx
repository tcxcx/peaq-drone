"use client"

import React, { ReactNode, useRef, ElementType } from 'react';
import clsx from 'clsx';
import { useMouse } from 'react-use';

type BaseSpotlightCardProps = {
  as?: ElementType; // ElementType from React
  from?: string;
  via?: string | null;
  to?: string;
  size?: number;
  mode?: 'before' | 'after';
  children?: ReactNode;
  className?: string;
};

export const BaseSpotlightCard: React.FC<BaseSpotlightCardProps> = ({
  as: Component = 'div',
  from = 'rgba(255,255,255,0.8)',
  via = null,
  to = 'transparent',
  size = 350,
  mode = 'before',
  children,
  className,
  ...props
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { elX, elY } = useMouse(container);

  const spotlightColorStops = [from, via, to].filter((value) => !!value).join(',');

  const classes =
    mode === 'before'
      ? `before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]`
      : `after:absolute before:inset-0 after:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]`;

  return (
    <Component
      ref={container}
      className={clsx('relative transform-gpu overflow-hidden', classes, className)}
      {...props}
      style={{
        '--x': `${elX}px`,
        '--y': `${elY}px`,
        '--spotlight-color-stops': spotlightColorStops,
        '--spotlight-size': `${size}px`,
      }}>
      {children}
    </Component>
  );
};

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  from?: string;  // Optional prop
  via?: string;   // Optional prop
  size?: number;  // Optional prop
};

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  from,
  via,
  size,
}) => {  return (
    <BaseSpotlightCard
      from="rgba(255,255,255,0.2)"
      className={clsx(
        "relative rounded-[--radius] [--radius:theme(borderRadius.2xl)] lg:[--radius:theme(borderRadius.3xl)]",
        className,
      )}>
      <div className="absolute inset-x-0 bottom-[--radius] top-0 rounded-t-[--radius] bg-gradient-to-b from-white/15 to-transparent"></div>

      <div className="absolute inset-x-[--radius] top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>

      <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-950"></div>

      <div className="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(backgroundColor.white/3%),transparent)]"></div>

      <div className="relative flex h-full flex-col">{children}</div>
    </BaseSpotlightCard>
  )
}

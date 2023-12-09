"use client";

import clsx from "clsx";
import {
  ClipboardDocumentCheckIcon,
  UserIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";

import { AlarmCheckIcon, PackageCheck, Bird, Atom, Boxes } from "lucide-react";

import {
  SectionWrapper,
  SectionBadge,
  SectionHeading,
  SectionTitle,
  SectionTitleFade,
  SectionDescription,
} from "@/components/UI/Section";

import { ScrollReveal } from "@/components/UI/ScrollReveal";
import { SpotlightCard } from "@/components/UI/SpotlightCard";

function FeatureCard({ children, className }) {
  return (
    <SpotlightCard className={clsx("p-8", className)}>{children}</SpotlightCard>
  );
}

function FeatureCardThumbnail({ children }) {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      {children}
    </div>
  );
}

function FeatureCardBody({ children }) {
  return <div className="mt-4">{children}</div>;
}

function FeatureCardTitle({ children }) {
  return <div className="text-lg text-white">{children}</div>;
}

function FeatureCardDescription({ children }) {
  return (
    <p className="mt-4 text-sm font-light leading-relaxed text-white/75">
      {children}
    </p>
  );
}

function DocumentsFeature({ className }) {
  const dots = new Array(9);

  return (
    <FeatureCard className={className}>
      <FeatureCardThumbnail>
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow">
          <Bird className="relative h-8 w-8 fill-white/10 stroke-[1] text-white" />
        </div>

        <div className="w-[6.5rem] overflow-hidden">
          <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:6s]">
            {[...dots, ...dots].map((dot, index) => (
              <div key={index} className="px-1">
                <div className="h-1 w-1 shrink-0 rounded-full bg-white/40"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow">
          <Atom className="relative h-8 w-8 fill-cyan-400/10 stroke-[1] text-cyan-400" />
        </div>
      </FeatureCardThumbnail>

      <FeatureCardBody>
        <FeatureCardTitle>Service your community</FeatureCardTitle>
        <FeatureCardDescription>
          Join the network by connecting your drone to Peaq Network and start
          servicing your community with smart deliveries! Enjoy passive income with Drone Hive auto-pilot.
        </FeatureCardDescription>
      </FeatureCardBody>
    </FeatureCard>
  );
}

function ResponsesFeature({ className }) {
  const dots = new Array(3);

  return (
    <FeatureCard className={className}>
      <FeatureCardThumbnail>
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow">
          <UserIcon className="relative h-8 w-8 fill-white/10 stroke-[1] text-white" />
        </div>

        <div className="w-9 overflow-hidden">
          <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:2s]">
            {[...dots, ...dots].map((dot, index) => (
              <div key={index} className="px-1">
                <div className="h-1 w-1 shrink-0 rounded-full bg-white/40"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <AlarmCheckIcon className="relative h-8 w-8 fill-cyan-400/10 stroke-[1] text-cyan-400" />
        </div>

        <div className="w-9 overflow-hidden">
          <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:2s]">
            {[...dots, ...dots].map((dot, index) => (
              <div key={index} className="px-1">
                <div className="h-1 w-1 shrink-0 rounded-full bg-white/40"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow">
          <PackageCheck className="relative h-8 w-8 fill-teal-400/10 stroke-[1] text-teal-400" />
        </div>
      </FeatureCardThumbnail>

      <FeatureCardBody>
        <FeatureCardTitle>Effortless Order Placement</FeatureCardTitle>
        <FeatureCardDescription>
          Place your shipping orders with just a few taps. We simplify the
          process of scheduling a drone pickup. Enter your details, choose a
          time slot, and let our drones handle the rest.
        </FeatureCardDescription>
      </FeatureCardBody>
    </FeatureCard>
  );
}

function ReferencesFeature({ className }) {
  const dots = new Array(3);

  return (
    <FeatureCard className={className}>
      <FeatureCardThumbnail>
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow">
          <Boxes className="relative h-8 w-8 fill-white/10 stroke-[1] text-white" />
        </div>

        <div className="w-9 overflow-hidden">
          <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:2s]">
            {[...dots, ...dots].map((dot, index) => (
              <div key={index} className="px-1">
                <div className="h-1 w-1 shrink-0 rounded-full bg-white/40"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <CubeTransparentIcon className="relative h-8 w-8 fill-green-400/10 stroke-[1] text-green-400" />
        </div>

        <div className="w-9 overflow-hidden">
          <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:2s]">
            {[...dots, ...dots].map((dot, index) => (
              <div key={index} className="px-1">
                <div className="h-1 w-1 shrink-0 rounded-full bg-white/40"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow">
          <ClipboardDocumentCheckIcon className="relative h-8 w-8 fill-violet-400/10 stroke-[1] text-violet-400" />
        </div>
      </FeatureCardThumbnail>

      <FeatureCardBody>
        <FeatureCardTitle>Real-time Tracking</FeatureCardTitle>
        <FeatureCardDescription>
          Stay updated with live tracking of your shipment with real-time
          updates and notifications, for your drone-delivered parcels from
          departure to arrival.
        </FeatureCardDescription>
      </FeatureCardBody>
    </FeatureCard>
  );
}

export function PrimaryFeatures() {
  return (
    <div id="overview" className="scroll-mt-8 py-8 lg:py-16">
      <ScrollReveal once={true} trigger="middle" className="[--duration:500ms]">
        {(isActive) => (
          <SectionWrapper>
            <SectionHeading>
              <SectionBadge>Powered by Polkadot</SectionBadge>

              <SectionTitle>
                Join the Drone Revolution
                <SectionTitleFade>
                  <br />
                  with Peaq Network
                </SectionTitleFade>
              </SectionTitle>

              <SectionDescription>
                Drone Hive connects you to a decentralized drone Economy of
                Things network.
                <br className="hidden lg:block" />
                Your journey towards revolutionizing delivery services starts
                here!
              </SectionDescription>
            </SectionHeading>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
              <DocumentsFeature
                className={clsx(
                  " transition-all delay-150 duration-[--duration]",
                  !isActive ? "translate-y-8 opacity-0" : ""
                )}
              />
              <ResponsesFeature
                className={clsx(
                  " transition-all delay-300 duration-[--duration]",
                  !isActive ? "translate-y-8 opacity-0" : ""
                )}
              />
              <ReferencesFeature
                className={clsx(
                  " transition-all delay-[450ms] duration-[--duration]",
                  !isActive ? "translate-y-8 opacity-0" : ""
                )}
              />
            </div>
          </SectionWrapper>
        )}
      </ScrollReveal>
    </div>
  );
}

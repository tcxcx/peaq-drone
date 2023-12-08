"use client";

import clsx from "clsx";
import {
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  DocumentIcon,
  DocumentTextIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import {
  SectionWrapper,
  SectionBadge,
  SectionHeading,
  SectionTitle,
  SectionTitleFade,
  SectionDescription,
} from "../UI/Section";
import { ScrollReveal } from "../UI/ScrollReveal";
import { SpotlightCard } from "../UI/SpotlightCard";

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
          <DocumentIcon className="relative h-8 w-8 fill-white/10 stroke-[1] text-white" />
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
          <ChatBubbleLeftRightIcon className="relative h-8 w-8 fill-cyan-400/10 stroke-[1] text-cyan-400" />
        </div>
      </FeatureCardThumbnail>

      <FeatureCardBody>
        <FeatureCardTitle>Upload documents</FeatureCardTitle>
        <FeatureCardDescription>
          Place your shipping orders with just a few taps. Our intuitive DApp
          interface simplifies the process of scheduling a drone pickup. Enter
          your details, choose a time slot, and let our drones handle the rest.
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
          <ChatBubbleLeftRightIcon className="relative h-8 w-8 fill-cyan-400/10 stroke-[1] text-cyan-400" />
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
          <DocumentTextIcon className="relative h-8 w-8 fill-teal-400/10 stroke-[1] text-teal-400" />
        </div>
      </FeatureCardThumbnail>

      <FeatureCardBody>
        <FeatureCardTitle>Real-time responses</FeatureCardTitle>
        <FeatureCardDescription>
          Stay updated with live tracking of your shipment. Our DApp provides
          real-time updates and notifications, giving you peace of mind as you
          monitor your drone-delivered parcels from departure to arrival.
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
          <DocumentIcon className="relative h-8 w-8 fill-white/10 stroke-[1] text-white" />
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
          <DocumentTextIcon className="relative h-8 w-8 fill-green-400/10 stroke-[1] text-green-400" />
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
        <FeatureCardTitle>Secure & Reliable</FeatureCardTitle>
        <FeatureCardDescription>
          Security is our top priority. With advanced encryption and blockchain
          technology, every shipment is secure and tamper-proof. Trust our
          decentralized drone network for reliable and safe deliveries every
          time.
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
              <SectionBadge>
                Empower Your Community {isActive ? "true" : "false"}{" "}
              </SectionBadge>

              <SectionTitle>
                Join the Drone Revolution <br />
                <SectionTitleFade>with Peaq Network</SectionTitleFade>
              </SectionTitle>

              <SectionDescription>
                Imagine a world where drone deliveries are not just a
                convenience but a sustainable business model for everyone. With
                Peaq Network, this is now a reality. Purchase your drone,
                receive it at your doorstep, and connect it to the Peaq Network
                using a unique Machine ID. You're not just a user; you're a
                service provider, contributing to a decentralized, worldwide
                drone shipping network. Generate passive income by serving your
                local area - a win-win for you and your community. Be part of
                this groundbreaking movement towards efficient, eco-friendly,
                and automated drone shipping services.
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

import Image from "next/image";

import { SectionWrapper } from "@/components/UI/Section";

// import appImage from "@/app/images/app.webp";

export function Hero() {
  return (
    <div className="relative pt-32">
      <div className="pointer-events-none absolute inset-0 bg-center bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]"></div>

      <SectionWrapper className="py-8 lg:py-16">
        <div className="flex flex-col items-center justify-center">
          <h1 className="group text-center font-display text-3xl uppercase text-basement-purple leading-tight lg:text-5xl font-ribbon">
            <span>Autonomous Drone</span>
            <br />
            <span></span>
            <span className="bg-gradient-to-br font-mono from-white/90 to-white/30 bg-clip-text text-transparent">
              Delivery
            </span>
          </h1>
          <div className="relative flex place-items-center before:absolute before:h-[200px] before:w-[180px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-indigo-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <h2 className="mt-8 max-w-xl text-center text-lg text-white/60 lg:text-xl">
              Join the future of decentralized drone delivery. Purchase your
              drone, connect to Peaq Network, and start earning through
              automated drone shipping in your area.
            </h2>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 lg:flex-row">
            <a
              href="#"
              className="inline-block uppercase rounded-full bg-white px-4 py-1.5 text-sm font-medium text-zinc-950 transition duration-300 hover:bg-zinc-300 font-ribbon"
            >
              Explore Drones
            </a>

            <span className="text-sm font-ribbon uppercase">
              Experience next-gen delivery now
            </span>
          </div>

          <div className="relative mx-auto mt-8 w-full max-w-5xl lg:mt-16">
            <div className="absolute -top-8 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/25 blur-3xl lg:-top-8 lg:h-[32rem] lg:w-[32rem] lg:blur-[128px]"></div>

            <div className="relative w-full rounded-2xl bg-gradient-to-b from-white/5 to-white/10 p-2 shadow-2xl shadow-white/10 ring-1 ring-white/10 backdrop-blur-sm lg:rounded-3xl">
              {/* <Image
                  className="h-auto w-full rounded-xl border border-white/10 shadow-md shadow-zinc-950/50 lg:rounded-2xl"
                  alt="App screenshot"
                  priority
                  src={appImage}
                /> */}
            </div>
          </div>
        </div>
      </ SectionWrapper>
    </div>
  );
}

import { tools } from "@/data/tools";
import { Sprite } from "@/components/Sprite";
import Boat from "@/assets/isle_boat.gif";
import discord from "@/assets/images/discord.png";

export function Home() {
  return (
    <>
      <main className="flex flex-col items-center p-4 pt-8 h-[76dvh] max-w-[700px] mx-auto">
        <section className="w-full">
          <div>
            <h1 className="text-[2rem] md:text-5xl text-center font-pixelify">
              Welcome to
            </h1>
            <h2 className="text-[3rem] md:text-7xl font-pixelify text-center w-full">
              SFL{" "}
              <span className="text-[#52b641] text-shadow-[4px_4px] text-shadow-[#1d6711]">
                TOOLS
              </span>
            </h2>
          </div>
          <a
            className="flex justify-center underline underline-offset-3 text-indigo-400/90 font-semibold text-[1.25rem] md:text-2xl"
            href="https://sunflower-land.com/play/#/visit/5013675572414755"
            target="_blank"
          >
            Visit my land!
          </a>
          <article className="grid grid-cols-1 gap-4 mt-6 md:mt-12">
            {tools.map(({ name, sprite, url, description }, i) => (
              <a
                className={`flex border-2 border-slate-500 w-full sm:w-[25rem] h-[10rem] max-w-[500px] rounded-xl p-2 bg-slate-800 overflow-hidden mx-auto md:w-[30rem] ${
                  sprite === "digging" ? "" : "lg:justify-between"
                }`}
                key={i}
                href={url}
              >
                <div className="pl-1 md:pl-3 flex gap-2 flex-col">
                  <h3 className="text-2xl text-nowrap md:text-4xl font-pixelify-light text-[#77c16a] text-shadow-[1px_2px] text-shadow-[#FFF]/20">
                    {name}
                  </h3>
                  <p className="text-sm w-[10rem] md:text-lg md:w-[16rem]">
                    {description}
                  </p>
                </div>
                {sprite === "digging" ? (
                  <Sprite spriteImage={sprite} />
                ) : (
                  <img
                    className="w-[6rem] h-[4rem] mt-8 md:w-[11rem] md:h-[6rem] md:mt-6 pixelated"
                    src={Boat}
                  />
                )}
              </a>
            ))}
          </article>
          <article className="flex flex-col mt-4">
            <p className="text-center text-xl font-pixelify-light">
              You wish donate?
            </p>
            <span className="bg-slate-800 p-1 px-2 rounded-full border-2 border-white/30 text-xs md:text-[0.95rem] text-center mx-auto">
              0xAf57D68A12F28501580407B80B4d3690c9B74e62
            </span>
          </article>
        </section>
      </main>
      <footer className="pt-0 p-4 flex flex-col gap-4 items-center h-[13rem] max-w-[500px] relative mx-auto">
        <article className="flex flex-col gap-4">
          <a
            href="https://discord.gg/MexBzYbxju"
            noreferrer="true"
            target="_blank"
            className="text-center bg-white/20 rounded-lg border-2 border-lime-100 p-3.5 absolute bottom-4 right-4"
          >
            <img
              src={discord}
              alt="Discord logo pixel art"
              className="w-[3.25rem] h-auto aspect-square mx-auto transition-colors duration-300"
              style={{ WebkitUserDrag: "none" }}
            />
          </a>
          <a
            className="bg-white/20 w-fit rounded-lg border-2 border-lime-100 p-2 transition-colors duration-300 absolute bottom-4 left-4"
            href="https://docs.google.com/spreadsheets/d/1mtb3budL7RBDsV7-ly3C9RLyWtgr0Bbmk5DNVqKX5Dg/edit?gid=0#gid=0"
            target="_blank"
          >
            <img
              src="/excel-icon.png"
              alt="Excel list"
              className="w-[2.25rem] h-auto mx-auto aspect-square"
              style={{ WebkitUserDrag: "none" }}
            />
            Visit Farm's
          </a>
        </article>
      </footer>
    </>
  );
}

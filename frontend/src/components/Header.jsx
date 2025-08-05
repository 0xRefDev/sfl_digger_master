import logo from "../assets/images/logo.png";
import trophy from "../assets/images/trophy.png";
import discord from "../assets/images/discord.png";
import arrow from "../assets/images/arrow.png";

export function Header() {
  return (
    <>
      <header className="relative flex items-center justify-center flex-col p-4 gap-3 max-w-[550px] mx-auto">
        <a
          href="https://discord.gg/MexBzYbxju"
          noreferrer="true"
          target="_blank"
          className="absolute top-4 left-4"
        >
          <img
            src={discord}
            alt="Discord logo pixel art"
            className="size-[3.25rem] drop-shadow-amber-100 drop-shadow-sm"
            style={{ WebkitUserDrag: "none" }}
          />
        </a>
        <button className="absolute top-4 right-4 bg-lime-500/60 rounded-lg border-2 border-lime-400 p-2 hover:bg-lime-200/70 transition-colors duration-300 cursor-not-allowed opacity-50">
          <img
            src={trophy}
            alt="Trophy - Pixel ART"
            className="w-[2.25rem] h-auto drop-shadow-amber-500 drop-shadow-md"
            style={{ WebkitUserDrag: "none" }}
          />
        </button>
        <img
          src={logo}
          alt="Dig Master Logo - Pixel ART"
          className="w-[15rem] h-auto select-none user-drag-none"
          style={{ WebkitUserDrag: "none" }}
        />
        <h1 className="relative px-4 py-1 bg-[#030712]/60 rounded-full border-2 border-cyan-800/50">
          Made with ❤️ by REFH4CK
          <div className="absolute -z-10 flex justify-between w-[17.5rem] top-5 -translate-y-1/2 -left-7">
            <span><img src={arrow} alt="Green pixel art arrow" className="size-6 -rotate-90" /></span>
            <span><img src={arrow} alt="Green pixel art arrow" className="size-6 rotate-y-180 rotate-90" /></span>
          </div>
          <span className="absolute bg-amber-400/35 px-2 py-1 rounded-full -right-7 top-12 -translate-y-1/2 text-xs font-mono ">
            0xAf57D68A12F28501580407B80B4d3690c9B74e62
          </span>
        </h1>
          
      </header>
    </>
  );
}

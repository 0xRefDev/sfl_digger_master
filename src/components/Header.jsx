import logo from "../assets/images/logo.png";
import trophy from "../assets/images/trophy.png";
import discord from "../assets/images/discord.png";

export function Header() {
  return (
    <>
      <header className="relative flex items-center justify-center flex-col p-4 gap-3 max-w-[800px] mx-auto">
        <a
          href="https://discord.gg/MexBzYbxju"
          noreferrer
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
        <h1 className="px-4 py-1 bg-[#030712]/60 rounded-full border-2 border-cyan-800/50">
          Made with ❤️ by REFH4CK
        </h1>
      </header>
    </>
  );
}

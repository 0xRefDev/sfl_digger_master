import logo from "@/assets/images/logo.png";
import discord from "@/assets/images/discord.png";

export function Header() {
  return (
    <>
      <header className="relative flex items-center justify-center flex-col p-4 pb-0 gap-3 max-w-[550px] mx-auto">
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
        <button
          className="absolute top-4 right-4 bg-white/20 rounded-lg border-2 border-lime-100 p-2 transition-colors duration-300 cursor-pointer"
          onClick={() =>
            window.open(
              "https://docs.google.com/spreadsheets/d/1mtb3budL7RBDsV7-ly3C9RLyWtgr0Bbmk5DNVqKX5Dg/edit?gid=0#gid=0",
              "_blank"
            )
          }
        >
          <img
            src="/excel-icon.png"
            alt="Excel list"
            className="w-[2.25rem] h-auto"
            style={{ WebkitUserDrag: "none" }}
          />
        </button>
        <img
          src={logo}
          alt="Dig Master Logo - Pixel ART"
          className="w-[12rem] h-auto select-none user-drag-none"
          style={{ WebkitUserDrag: "none" }}
        />
        <h1 className="relative px-4 py-1 bg-[#030712]/60 rounded-full border-2 border-cyan-800/50">
          Made with ❤️ by REFH4CK
        </h1>
      </header>
    </>
  );
}

import logo from "../assets/images/logo.png";
import trophy from "../assets/images/trophy.png";

export function Header() {
  return (
    <>
      <header className="relative flex items-center justify-center flex-col p-4 gap-3">
        <button className="absolute top-4 right-4 bg-lime-500/60 rounded-lg border-2 border-lime-400 p-2 hover:bg-lime-200/70 transition-colors duration-300 cursor-not-allowed opacity-50">
          <img
            src={trophy}
            alt="Trophy - Pixel ART"
            className="w-[3rem] h-auto drop-shadow-amber-500 drop-shadow-md"
          />
        </button>
        <img
          src={logo}
          alt="Dig Master Logo - Pixel ART"
          className="w-[15rem] h-auto"
        />
        <h1 className="px-4 py-1 bg-[#030712]/60 rounded-full border-2 border-cyan-800/50">
          Made with ❤️ by REFH4CK
        </h1>
      </header>
    </>
  );
}

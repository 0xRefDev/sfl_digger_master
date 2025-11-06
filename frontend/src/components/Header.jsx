import { GoBack } from "@/components/GoBack";
import logo from "@/assets/images/logo.png";

export function Header() {
  return (
    <>
      <header className="flex items-center justify-center w-fit relative flex-col p-4 pb-0 gap-3 max-w-[550px] mx-auto">
        <span className="absolute -left-14 top-0 block size-20">
          <GoBack />
        </span>
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

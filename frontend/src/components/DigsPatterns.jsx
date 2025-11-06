import { useState } from "react";
import { PatternsModal } from "@/components/PatternsModal";

export function DigsPatterns() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center p-2 mt-2 items-center">
      <PatternsModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <button
        onClick={() => { setIsOpen((prev) => !prev); }}
        className="bg-[#c0cbdc] text-slate-800 p-2 rounded font-pixelify-light border-2 border-slate-700 shadow-md shadow-[#fff]/10 cursor-pointer hover:bg-[#9fb2cf]"
      >
        Today Patterns
      </button>
    </div>
  );
}

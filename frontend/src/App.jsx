import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { DigTable } from "@/components/DigTable";
import { DigItems } from "@/components/DigItems";
import Shovel from "@/assets/images/shovel.png";

export function App() {
  const [farmId, setFarmId] = useState("");
  const [igDiggingProgress, setIgDiggingProgress] = useState(() => {
    const saved = localStorage.getItem("digProgress");
    return saved ? JSON.parse(saved).igDiggingProgress ?? [] : [];
  });

  const [pieces, setPieces] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = localStorage.getItem("digProgress");
      if (!saved) return [];

      const parsed = JSON.parse(saved);
      return Array.isArray(parsed.pieces)
        ? parsed.pieces.filter((item) => item?.id && item?.src && item?.name)
        : [];
    } catch (e) {
      console.error("Error to load pieces:", e);
      localStorage.removeItem("digProgress");
      return [];
    }
  });

  useEffect(() => {
    const prev = JSON.parse(localStorage.getItem("digProgress")) || {};

    const updated = {
      pieces: pieces.length ? pieces : prev.pieces || [],
      igDiggingProgress:
        Array.isArray(igDiggingProgress) && igDiggingProgress.length
          ? igDiggingProgress
          : prev.igDiggingProgress || [],
    };

    localStorage.setItem("digProgress", JSON.stringify(updated));
  }, [pieces, igDiggingProgress]);

  const handleSetFarmId = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFarmId(value);
    } else {
      alert("Your Farm ID must be a number😬");
    }
  };

  const igDigProgress = async () => {
    if (!farmId) {
      alert("Please provide a Farm ID.");
      return;
    }

    try {
      const response = await fetch(
        `https://sfl-digger-master-backend.vercel.app/api/digData/${farmId}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      const digging = data?.data?.digging?.grid;

      if (Array.isArray(digging)) {
        setIgDiggingProgress(digging);

        const prevData = JSON.parse(localStorage.getItem("digProgress")) || {};
        const updatedData = {
          ...prevData,
          igDiggingProgress: digging,
          pieces,
        };
        localStorage.setItem("digProgress", JSON.stringify(updatedData));
      } else {
        setIgDiggingProgress(null);
        alert(
          "No se encontró progreso de excavación válido. Revisa tu Farm ID."
        );
      }
    } catch (error) {
      console.error("Error al obtener el progreso:", error);
      alert("Error al cargar el progreso. Verifica tu Farm ID.");
      setIgDiggingProgress([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (farmId) {
      igDigProgress();
    } else {
      alert("Please, enter your Farm ID.");
    }
  };

  let digs = 25;
  if (Array.isArray(pieces)) {
    pieces.forEach((p) => {
      if (p?.name && p.name !== "Nothing" && p.name !== "Possible") {
        digs = digs - 1;
      }
    });
  }

  return (
    <Layout>
      <Header />
      <main className="max-w-[480px] mx-auto">
        <section className="w-full flex flex-col items-center justify-center">
          {/* Options: Reset, Farm ID, Shovels */}
          <article className="w-full flex justify-between items-center gap-4">
            <div className="flex items-center">
              {/* Reset Button */}
              <button
                onClick={() => {
                  if (confirm("¿Reset all progress?")) {
                    setPieces([]);
                    setIgDiggingProgress([]);
                    localStorage.setItem("digProgress", JSON.stringify({"pieces": [], "igDiggingProgress": []}));
                    localStorage.setItem("usedShovels", JSON.stringify(25));
                  }
                }}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                <img
                  src="https://img.icons8.com/?size=24&id=59872&format=png&color=ffffff"
                  alt="Refresh image"
                />
              </button>
            </div>
            {/* Farm ID Input */}
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <input
                type="text"
                className="outline-none bg-[#030712]/60 rounded-full border-2 border-cyan-800/50 px-4 py-1 placeholder:text-green-500/90 placeholder:font-mono xs:w-fit w-[21rem]"
                placeholder="# Farm ID"
                value={farmId}
                onChange={handleSetFarmId}
              />
            </form>
            {/* Shovels */}
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-center my-4">
                {digs < 0 ? 0 : digs}
              </h1>
              <img
                src={Shovel}
                alt="Shovel"
                className="w-8"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </article>
          {/* Dig Items */}
          <DigItems onItemClick={() => {}} />
        </section>

        <section className="flex flex-col gap-5 items-center justify-center">
          <DigTable
            pieces={pieces}
            setPieces={setPieces}
            igProgress={
              Array.isArray(igDiggingProgress) ? igDiggingProgress : []
            }
          />
        </section>
      </main>
    </Layout>
  );
}

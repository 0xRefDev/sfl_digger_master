import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { DigTable } from "./components/DigTable";
import { DigItems } from "./components/DigItems";
import Shovel from "./assets/images/shovel.png";

export function App() {
  const [farmId, setFarmId] = useState("");
  const [igDiggingProgress, setIgDiggingProgress] = useState(() => {
    const saved = localStorage.getItem("digProgress");
    return saved ? JSON.parse(saved).igDiggingProgress : null;
  });

  const [piezas, setPiezas] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = localStorage.getItem("digProgress");
      if (!saved) return [];

      const parsed = JSON.parse(saved);
      // Validación profunda del array
      return Array.isArray(parsed)
        ? parsed.filter((item) => item?.id && item?.src && item?.nombre)
        : [];
    } catch (e) {
      console.error("Error al cargar piezas:", e);
      localStorage.removeItem("digProgress");
      return [];
    }
  });

  useEffect(() => {
    const progressData = {
      piezas,
      igDiggingProgress,
    };
    localStorage.setItem("digProgress", JSON.stringify(progressData));
  }, [piezas, igDiggingProgress]);

  const handleSetFarmId = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFarmId(value);
    } else {
      alert("Tu Farm ID solo debe contener números😬");
    }
  };

  const igDigProgress = async () => {
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

      if (data.desert?.digging) {
        setIgDiggingProgress(data.desert.digging);
      } else {
        setIgDiggingProgress(null);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cargar el progreso. Verifica tu Farm ID.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (farmId) {
      igDigProgress();
    } else {
      alert("Por favor, ingresa tu Farm ID.");
    }
  };

  let digs = 25;
  if (Array.isArray(piezas)) {
    piezas.forEach((p) => {
      if (p?.nombre && p.nombre !== "Nothing" && p.nombre !== "Possible") {
        digs = digs - 1;
      }
    });
  }

  return (
    <Layout>
      <Header />
      <main className="max-w-[550px] mx-auto">
        <section className="w-full flex flex-col items-center justify-center">
          <article className="w-full flex justify-between items-center gap-4 px-4 mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (confirm("¿Reiniciar todo el progreso?")) {
                    setPiezas([]);
                    setIgDiggingProgress([]);
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
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <input
                type="text"
                className="outline-none bg-[#030712]/60 rounded-full border-2 border-cyan-800/50 px-4 py-1 placeholder:text-green-500/90 placeholder:font-mono"
                placeholder="# Farm ID"
                value={farmId}
                onChange={handleSetFarmId}
              />
            </form>
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
          <DigItems />
        </section>

        <section className="flex flex-col gap-5 items-center justify-center">
          <DigTable
            piezas={piezas}
            setPiezas={setPiezas}
            igProgress={igDiggingProgress}
          />
        </section>
      </main>
    </Layout>
  );
}

import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { DigTable } from "./components/DigTable";
import { DigItems } from "./components/DigItems";

export function App() {
  const [piezas, setPiezas] = useState(() => {
    const saved = localStorage.getItem("digProgress");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("digProgress", JSON.stringify(piezas));
  }, [piezas]);

  const agregarPieza = (src, nombre) => {
    console.log("Añadiendo pieza:", nombre);
    const nuevaPieza = {
      id: Date.now(),
      src,
      nombre,
      x: 0,
      y: 0,
    };
    setPiezas([...piezas, nuevaPieza]);
  };

  return (
    <Layout>
      <Header />
      <main className="max-w-[800px] mx-auto">
        <section className="w-full flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-4">
            <h1 className="text-xl font-bold text-center my-4">Dig Items</h1>
            <button
            onClick={() => {
              if (confirm("¿Reiniciar todo el progreso?")) {
                setPiezas([]);
              }
            }}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            <img src="https://img.icons8.com/?size=24&id=59872&format=png&color=ffffff" alt="Refresh image" />
          </button>
          </div>
          <DigItems />
        </section>

        <section className="flex flex-col gap-5 items-center justify-center">
          <DigTable piezas={piezas} setPiezas={setPiezas} />
          <h1 className='px-2 py-2 bg-[#030712]/60 rounded-full border-2 border-cyan-800/50'>
            <b>Donate:</b> <span className="bg-amber-400/20 px-2 py-1 rounded-full">0xAf57D68A12F28501580407B80B4d3690c9B74e62</span>
          </h1>
        </section>
      </main>
    </Layout>
  );
}

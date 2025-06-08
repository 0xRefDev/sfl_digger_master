import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { DigTable } from "./components/DigTable";
import { DigItems } from "./components/DigItems";

export function App() {
  // Cargar piezas desde localStorage al inicio
  const [piezas, setPiezas] = useState(() => {
    const saved = localStorage.getItem("digProgress");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cada vez que cambien las piezas
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
          <DigItems onItemClick={agregarPieza} />
        </section>

        <section className="flex justify-center">
          <DigTable piezas={piezas} setPiezas={setPiezas} />
        </section>
      </main>
    </Layout>
  );
}

import { useRef } from "react";
import Draggable from "react-draggable";
import DigSite from "../assets/images/digsite.png";

export function DigTable({ piezas, setPiezas }) {
  const imgWidth = 500;
  const imgHeight = 500;
  const cellSize = imgWidth / 10;
  const nodeRef = useRef(null);

  const handleStop = (id, e, data) => {
    const snappedX = Math.round(data.x / cellSize) * cellSize;
    const snappedY = Math.round(data.y / cellSize) * cellSize;
    setPiezas(
      piezas.map((p) => (p.id === id ? { ...p, x: snappedX, y: snappedY } : p))
    );
  };

  const eliminarPieza = (id, e) => {
    e.stopPropagation(); // Evita que se active el arrastre
    setPiezas(piezas.filter((pieza) => pieza.id !== id));
  };

  return (
    <div
      className="relative flex justify-center"
      style={{ width: imgWidth, height: imgHeight }}
    >
      <img
        src={DigSite}
        alt="DigSite"
        className="absolute top-4 left-0 w-full h-full block pointer-events-none rounded-lg"
        style={{ zIndex: 0 }}
      />

      <div className="absolute top-4 left-0 w-full h-full">
        {piezas.map((pieza) => (
          <Draggable
            key={pieza.id}
            nodeRef={nodeRef}
            defaultPosition={{ x: pieza.x, y: pieza.y }}
            onStop={(e, data) => handleStop(pieza.id, e, data)}
            grid={[cellSize, cellSize]}
            bounds="parent"
            cancel=".no-drag"
          >
            <div
              ref={nodeRef}
              className="cursor-move flex items-center justify-center absolute group"
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                transform: `translate(${pieza.x}px, ${pieza.y}px)`,
              }}
            >
              <img
                src={pieza.src}
                alt={pieza.nombre}
                className="w-[1.8rem] object-contain aspect-square drop-shadow drop-shadow-green-900 no-drag"
                style={{ imageRendering: "pixelated" }}
              />
              <button
                onClick={(e) => eliminarPieza(pieza.id, e)}
                className="absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-90 transition-opacity z-10 cursor-pointer no-drag"
                aria-label="Eliminar pieza"
              >
                <img src="https://img.icons8.com/color/cancel" alt="Cancel image" />
              </button>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}

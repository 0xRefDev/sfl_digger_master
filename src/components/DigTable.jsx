import { useRef } from "react";
import Draggable from "react-draggable";
import DigSite from '../assets/images/digsite.png';

export function DigTable({ piezas, setPiezas }) {
  const imgWidth = 500;
  const imgHeight = 500;
  const cellSize = imgWidth / 10;
  const nodeRef = useRef(null);

  const handleStop = (id, e, data) => {
    const snappedX = Math.round(data.x / cellSize) * cellSize;
    const snappedY = Math.round(data.y / cellSize) * cellSize;
    setPiezas(piezas.map(p => p.id === id ? { ...p, x: snappedX, y: snappedY } : p));
  };

  return (
    <div className="relative flex justify-center" style={{ width: imgWidth, height: imgHeight }}>
      {/* Imagen de fondo */}
      <img
        src={DigSite}
        alt="DigSite"
        className="absolute top-4 left-0 w-full h-full block pointer-events-none rounded-lg"
        style={{ zIndex: 0 }}
      />

      {/* Contenedor de piezas (asegura que no tenga estilos conflictivos) */}
      <div className="absolute top-4 left-0 w-full h-full">
        {piezas.map((pieza) => (
          <Draggable
            key={pieza.id}
            nodeRef={nodeRef}
            defaultPosition={{ x: pieza.x, y: pieza.y }} // Usa defaultPosition en lugar de position
            onStop={(e, data) => handleStop(pieza.id, e, data)}
            grid={[cellSize, cellSize]}
            bounds="parent"
          >
            <div
              ref={nodeRef}
              className="cursor-move flex items-center justify-center absolute"
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                transform: `translate(${pieza.x}px, ${pieza.y}px)` // ¡Clave! Usa translate en lugar de left/top
              }}
            >
              <img
                src={pieza.src}
                alt={pieza.nombre}
                className="w-[1.8rem] object-contain aspect-square drop-shadow drop-shadow-green-900"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}
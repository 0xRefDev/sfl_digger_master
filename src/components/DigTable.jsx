import { useRef } from "react";
import Draggable from "react-draggable";
import DigSite from "../assets/images/digsite.png";
import { digItems } from "./utils/item.js";

export function DigTable({ piezas = [], setPiezas, igProgress = [] }) {
  const imgWidth = 500;
  const imgHeight = 500;
  const cellSize = imgWidth / 10;
  const nodeRef = useRef(null);

  const digCount = 25;

  if (piezas.length > 0) {
    localStorage.setItem(
      "usedShovels",
      JSON.stringify(digCount - piezas.length)
    );
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleStop = (id, e, data) => {
    const snappedX = Math.round(data.x / cellSize) * cellSize;
    const snappedY = Math.round(data.y / cellSize) * cellSize;

    setPiezas((prevPiezas) => {
      const movedSand = prevPiezas.find((p) => p.id === id && p.isSand);
      if (!movedSand) return prevPiezas;

      // Calcular diferencia de movimiento
      const deltaX = snappedX - movedSand.x;
      const deltaY = snappedY - movedSand.y;

      // Mover Sand y sus X
      return prevPiezas.map((p) => {
        if (p.id === id) {
          return { ...p, x: snappedX, y: snappedY };
        }
        if (p.sandParentId === id) {
          return {
            ...p,
            x: p.x + deltaX,
            y: p.y + deltaY,
          };
        }
        return p;
      });
    });
  };

  const eliminarPieza = (id, e) => {
    e.stopPropagation();

    localStorage.setItem(
      "usedShovels",
      JSON.stringify(digCount - piezas.length + 1)
    );

    setPiezas((prev) => {
      const isSand = prev.some((p) => p.id === id && p.isSand);

      if (isSand) {
        return prev.filter((p) => p.id !== id && p.sandParentId !== id);
      }
      return prev.filter((p) => p.id !== id); // Pieza normal
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - cellSize / 2;
    const y = e.clientY - rect.top - cellSize / 2;

    // Snap to grid
    const snappedX = Math.round(x / cellSize) * cellSize;
    const snappedY = Math.round(y / cellSize) * cellSize;

    const sandId = Date.now();
    const newPieces = [];

    if (data.name === "Sand") {
      newPieces.push({
        id: sandId,
        src: data.img,
        name: "Sand",
        x: snappedX,
        y: snappedY,
        isSand: true,
      });

      const offsets = [
        { x: -cellSize, y: 0 },
        { x: cellSize, y: 0 },
        { x: 0, y: -cellSize },
        { x: 0, y: cellSize },
      ];

      offsets.forEach((offset, index) => {
        newPieces.push({
          id: `${sandId}-x-${index}`,
          src: digItems.Nothing,
          name: "Nothing",
          x: snappedX + offset.x,
          y: snappedY + offset.y,
          sandParentId: sandId,
          isSandX: true,
        });
      });
    } else {
      newPieces.push({
        id: sandId,
        src: data.img,
        name: data.name,
        x: snappedX,
        y: snappedY,
      });
    }

    setPiezas((prev = []) => [...prev, ...(Array.isArray(newPieces) ? newPieces : [])]);
  };

  return (
    <div
      className="relative flex justify-center"
      style={{ width: imgWidth, height: imgHeight }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <img
        src={DigSite}
        alt="DigSite"
        className="absolute top-4 left-0 w-full h-full block pointer-events-none rounded-lg select-none user-drag-none"
        style={{ zIndex: 0 }}
      />

      <div className="absolute top-4 left-0 w-full h-full overflow-hidden">
        {igProgress !== "" ? (
          <>
            {igProgress?.grid?.map((cell, index) => {
              const itemName = cell.items ? Object.keys(cell.items)[0] : null;

              return (
                <div
                  key={`${cell.x}-${cell.y}-${index}`}
                  className="absolute flex items-center justify-center"
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    left: cell.x * cellSize,
                    top: cell.y * cellSize,
                  }}
                >
                  {itemName && (
                    <div
                      className=""
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                      }}
                    >
                      <img
                        src={digItems[itemName]}
                        alt={itemName}
                        className="w-full h-full object-contain p-2"
                        style={{
                          imageRendering: "pixelated",
                          filter: "drop-shadow(0px 0px 2.5px #fff)",
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}

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
                  className="cursor-grab flex items-center justify-center absolute group"
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    transform: `translate(${pieza.x}px, ${pieza.y}px)`,
                  }}
                >
                  <img
                    src={pieza.src}
                    alt={pieza.name}
                    className="w-full h-full object-contain p-2"
                    draggable="false"
                    style={{
                      imageRendering: "pixelated",
                      filter: "drop-shadow(0px 0px 1.5px blue)",
                    }}
                  />
                  <button
                    onClick={(e) => eliminarPieza(pieza.id, e)}
                    className="absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-90 transition-opacity z-10 cursor-pointer no-drag"
                    aria-label="Eliminar pieza"
                  >
                    <img
                      src="https://img.icons8.com/color/cancel"
                      alt="Cancel image"
                    />
                  </button>
                </div>
              </Draggable>
            ))}
          </>
        ) : (
          piezas.map((pieza) => (
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
                className="cursor-grab flex items-center justify-center absolute group"
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  transform: `translate(${pieza.x}px, ${pieza.y}px)`,
                }}
              >
                <img
                  src={pieza.src}
                  alt={pieza.name}
                  className="w-full h-full object-contain p-2 drop-shadow drop-shadow-green-900"
                  draggable="false"
                  style={{ imageRendering: "pixelated" }}
                />
                <button
                  onClick={(e) => eliminarPieza(pieza.id, e)}
                  className="absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-90 transition-opacity z-10 cursor-pointer no-drag"
                  aria-label="Eliminar pieza"
                >
                  <img
                    src="https://img.icons8.com/color/cancel"
                    alt="Cancel image"
                  />
                </button>
              </div>
            </Draggable>
          ))
        )}
      </div>
    </div>
  );
}

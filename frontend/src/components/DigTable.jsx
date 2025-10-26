import { useRef, useEffect, useCallback } from "react";
import Draggable from "react-draggable";
import DigSite from "@/assets/images/digsite.png";
import Nothing from "@/assets/images/nothing.png";
import { digItems } from "@/components/utils/item.js";

function Piece({ piece, cellSize, handleStop, deletePiece }) {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: piece.x, y: piece.y }}
      onStop={(e, data) => handleStop(piece.id, e, data)}
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
        }}
      >
        <img
          src={piece.src}
          alt={piece.name}
          className="w-full h-full object-contain p-2"
          draggable="false"
          style={{
            imageRendering: "pixelated",
            filter: "drop-shadow(0px 0px 1.5px blue)",
          }}
        />
        <button
          onClick={(e) => deletePiece(piece.id, e)}
          className="absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-90 transition-opacity z-10 cursor-pointer no-drag"
          aria-label="Delete piece"
        >
          <img src="https://img.icons8.com/color/cancel" alt="Cancel image" />
        </button>
      </div>
    </Draggable>
  );
}

export function DigTable({ pieces = [], setPieces, igProgress = [] }) {
  const imgWidth = 480;
  const imgHeight = 480;
  const cellSize = imgWidth / 10;

  const digCount = 25;

  useEffect(() => {
    localStorage.setItem(
      "usedShovels",
      JSON.stringify(digCount - pieces.length)
    );
  }, [pieces]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleStop = useCallback(
    (id, e, data) => {
      const snappedX = Math.round(data.x / cellSize) * cellSize;
      const snappedY = Math.round(data.y / cellSize) * cellSize;

      setPieces((prevPieces) => {
        const movedSand = prevPieces.find((p) => p.id === id && p.isSand);
        if (!movedSand) return prevPieces;

        const deltaX = snappedX - movedSand.x;
        const deltaY = snappedY - movedSand.y;

        return prevPieces.map((p) => {
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
    },
    [cellSize, setPieces]
  );

  const deletePiece = useCallback(
    (id, e) => {
      e.stopPropagation();
      localStorage.setItem(
        "usedShovels",
        JSON.stringify(digCount - pieces.length + 1)
      );

      setPieces((prev) => {
        const isSand = prev.some((p) => p.id === id && p.isSand);
        if (isSand) {
          return prev.filter((p) => p.id !== id && p.sandParentId !== id);
        }
        return prev.filter((p) => p.id !== id);
      });
    },
    [pieces.length, setPieces]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    let droppedData;
    try {
      droppedData = JSON.parse(e.dataTransfer.getData("text/plain"));
    } catch {
      console.error("Error parsing dropped data");
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - cellSize / 2;
    const y = e.clientY - rect.top - cellSize / 2;

    const snappedX = Math.round(x / cellSize) * cellSize;
    const snappedY = Math.round(y / cellSize) * cellSize;

    const sandId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const newPieces = [];

    if (droppedData.name === "Sand") {
      newPieces.push({
        id: sandId,
        src: droppedData.img,
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
          src: Nothing,
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
        src: droppedData.img,
        name: droppedData.name,
        x: snappedX,
        y: snappedY,
      });
    }

    setPieces((prev = []) => [
      ...prev,
      ...(Array.isArray(newPieces) ? newPieces : []),
    ]);
  };

  return (
    <div
      className="relative flex justify-center top-2"
      style={{ width: imgWidth, height: imgHeight }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <img
        src={DigSite}
        alt="DigSite"
        className="absolute left-0 w-full h-full block pointer-events-none rounded-lg select-none user-drag-none"
        style={{ zIndex: 0 }}
      />

      <div className="absolute left-0 w-full h-full overflow-hidden">
        {Array.isArray(igProgress) &&
          igProgress.length > 0 &&
          igProgress.map((cell, index) => {
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

        {pieces.map((piece) => (
          <Piece
            key={piece.id}
            piece={piece}
            cellSize={cellSize}
            handleStop={handleStop}
            deletePiece={deletePiece}
          />
        ))}
      </div>
    </div>
  );
}

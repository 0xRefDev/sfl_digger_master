import { useRef, useCallback } from "react";
import { digItems } from "./utils/item.js";

export function DigItems({ onItemClick = () => {} }) {
  const dragItem = useRef(null);

  const handleDragStart = useCallback((e, img, name) => {
    try {
      e.dataTransfer.setData("text/plain", JSON.stringify({ img, name }));
      e.dataTransfer.effectAllowed = "copy";
      dragItem.current = e.currentTarget;
      e.currentTarget.style.opacity = "0.4";
    } catch (err) {
      console.error("Drag start error:", err);
    }
  }, []);

  const handleDragEnd = useCallback((e) => {
    if (e.currentTarget) {
      e.currentTarget.style.opacity = "1";
    }
    dragItem.current = null;
  }, []);

  const handleClick = useCallback(
    (img, name) => {
      onItemClick(img, name);
    },
    [onItemClick]
  );

  return (
    <article className="max-w-[490px]">
      <div className="w-full h-[6.1rem] overflow-y-auto py-2 flex flex-wrap justify-center items-center gap-1 rounded-lg outline-2 outline-amber-400/75">
        {Object.entries(digItems).map(([name, img]) => (
          <div
            key={name}
            role="button"
            aria-label={name}
            tabIndex={0}
            onClick={() => handleClick(img, name)}
            draggable
            onDragStart={(e) => handleDragStart(e, img, name)}
            onDragEnd={handleDragEnd}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick(img, name);
              }
            }}
            className="cursor-pointer hover:scale-110 transition-transform p-1"
          >
            <img
              src={img}
              title={name}
              alt={name}
              className="size-[1.85rem] object-contain aspect-square select-none"
              draggable="false"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        ))}
      </div>
    </article>
  );
}

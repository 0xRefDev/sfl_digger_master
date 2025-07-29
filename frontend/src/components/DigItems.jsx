import { useRef } from "react";
import { digItems } from "./utils/item.js";

export function DigItems({ onItemClick }) {

const dragItem = useRef(null);

  const handleDragStart = (e, img, name) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ img, name }));
    dragItem.current = e.target;
    e.target.style.opacity = "0.4";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  return (
    <article className="px-2 max-w-[550px]">
      <div className="w-full h-[6rem] overflow-y-auto py-2 flex flex-wrap justify-center items-center gap-1 rounded-lg outline-2 outline-amber-400/75">
        {Object.entries(digItems).map(([name, img]) => (
          <div 
            key={name}
            onClick={() => onItemClick(img, name)}
            draggable
            onDragStart={(e) => handleDragStart(e, img, name)}
            onDragEnd={handleDragEnd}
            className="cursor-pointer hover:scale-110 transition-transform p-1"
          >
            <img 
              src={img} 
              title={name} 
              alt={name} 
              className="size-[1.9rem] object-contain aspect-square select-none" 
              draggable="false"
              style={{ imageRendering: 'pixelated' }} 
            />
          </div>
        ))}
      </div>
    </article>
  );
}
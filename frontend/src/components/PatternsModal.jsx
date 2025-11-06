import { Fade, Bounce } from "react-awesome-reveal";
import { useState, useEffect, useCallback } from "react";

import { DIGGING_FORMATIONS } from "@/data/diggingPatterns";
import { digItems } from "@/components/utils/item";

export function PatternsModal({ isOpen, setIsOpen }) {
const [patterns, setPatterns] = useState([]);
const farmId = "5013675572414755";

const storagePatterns = (todayPatterns) => {
  localStorage.setItem(
    "patterns",
    JSON.stringify({ patterns: todayPatterns, timestamp: Date.now() })
  );
};

const getStoragePatterns = () => {
  return (
    JSON.parse(localStorage.getItem("patterns")) || {
      patterns: [],
      timestamp: "",
    }
  );
};

const needsUpdate = (storedTimestamp) => {
  if (!storedTimestamp) return true;
  
  const storedDate = new Date(storedTimestamp);
  const now = new Date();
  
  const lastReset = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0, 0
  ));
  
  return storedDate < lastReset;
};

const todayPatterns = useCallback(async () => {
  try {
    const response = await fetch(
      `https://sfl-digger-master-backend.vercel.app/api/digData/patterns/${farmId}`,
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

    const diggingData = await response.json();
    storagePatterns(diggingData.data.patterns);
    setPatterns(diggingData.data.patterns);
  } catch (error) {
    console.error("Error al obtener los patrones del día:", error);
    setPatterns([]);
  }
}, [farmId]);

const localPatterns = getStoragePatterns();

useEffect(() => {
  if (isOpen) {
    if (localPatterns.patterns.length <= 0 || needsUpdate(localPatterns.timestamp)) {
      todayPatterns();
    } else {
      setPatterns(localPatterns.patterns);
    }
  }
}, [isOpen, todayPatterns, localPatterns]);

  return (
    <>
      {isOpen && (
        <section className="absolute flex justify-center items-center top-0 left-0 bg-black/40 w-full h-dvh backdrop-blur-xs">
          <Fade direction="up">
            <article className="bg-slate-800 border-4 border-slate-700 w-[29rem] rounded-xl p-2 relative shadow-2xl px-3">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="absolute top-2 right-2 cursor-pointer"
              >
                <img
                  src="https://img.icons8.com/?size=28&id=fYgQxDaH069W&format=png&color=000000"
                  alt="Refresh image"
                />
              </button>

              <h2 className="text-center font-medium text-3xl">
                Today's Patterns
              </h2>
              <div className="grid grid-cols-3 gap-1.5 pt-5 h-full">
                {localPatterns.patterns.map((pat, index) => {
                  const formation = DIGGING_FORMATIONS[pat];
                  if (!formation) return null;

                  return (
                    <div
                      key={index}
                      className="bg-gray-400/20 grid grid-cols-4 grid-rows-3 h-full gap-px p-2 rounded border-2 border-white/30 gridDigging"
                    >
                      <Bounce delay={350} cascade damping={0.30}>
                      {formation.map(({ x, y, name }, i) => (
                          <div
                            key={i}
                            style={{ gridArea: `x${x}y${y}` }}
                            className="bg-green-400/50"
                          >
                            <img
                              src={digItems[name]}
                              className="w-7 h-7 object-contain pixelated p-1"
                              style={{
                                filter: "drop-shadow(0px 0px 1px #000)",
                              }}
                              alt={name}
                              title={name}
                            />
                          </div>
                      ))}
                      </Bounce>

                      {Array.from({ length: 12 }).map((_, i) => {
                        const x = i % 4;
                        const y = Math.floor(i / 4);
                        const hasItem = formation.some(
                          (item) => item.x === x && item.y === y
                        );

                        if (!hasItem) {
                          return (
                            <div
                              key={`empty-${x}-${y}`}
                              style={{ gridArea: `x${x}y${y}` }}
                              className="bg-red-600/30 border border-white/10"
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                  );
                })}
              </div>
            </article>
          </Fade>
        </section>
      )}
    </>
  );
}

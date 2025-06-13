import { useRef } from "react";
import AncientClock from "../assets/images/ancient_clock.png";
import BrokenPillar from "../assets/images/broken_pillar.webp";
import CamelBone from "../assets/images/camel_bone.webp";
import ClamShell from "../assets/images/clam_shell.webp";
import CowSkull from "../assets/images/cow_skull.png";
import Crab from "../assets/images/crab.png";
import Pipi from "../assets/images/pipi.webp";
import Sand from "../assets/images/sand.webp";
import PirateBounty from "../assets/images/pirate_bounty.webp";
import Scarab from "../assets/images/scarab.webp";
import SeaCucumber from "../assets/images/sea_cucumber.png";
import SeaWeed from "../assets/images/seaweed.webp";
import StarFish from "../assets/images/starfish.png";
import Vase from "../assets/images/vase.webp";
import WoodenCompass from "../assets/images/wooden_compass.webp";
import Coral from "../assets/images/coral.png";
import CockleShell from "../assets/images/cockle_shell.webp";
import Hieroglyph from "../assets/images/hieroglyph.webp";
import OldBottle from "../assets/images/old_bottle.png";
import Pearl from "../assets/images/pearl.webp";
import IronCompass from "../assets/images/iron_compass.webp";
import EmeraldCompass from "../assets/images/emerald_compass.webp";
import Nothing from "../assets/images/nothing.png";
import Possible from "../assets/images/possible.png";


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

  const digItems = {
  "Possible": Possible,
  "Nothing": Nothing,
  Sand: Sand,
  Crab: Crab,
  "Broken Pillar": BrokenPillar,
  "Camel Bone": CamelBone,
  "Clam Shell": ClamShell,
  "Old Bottle": OldBottle,
  "Ancient Clock": AncientClock,
  Hieroglyph: Hieroglyph,
  "Sea Cucumber": SeaCucumber,
  "Sea Weed": SeaWeed,
  Pearl: Pearl,
  "Star Fish": StarFish,
  "Cockle Shell": CockleShell,
  Coral: Coral,
  Vase: Vase,
  Pipi: Pipi,
  "Wooden Compass": WoodenCompass,
  Scarab: Scarab,
  "Pirate Bounty": PirateBounty,
  "Cow Skull": CowSkull,
  "Iron Compass": IronCompass,
  "Emerald Compass": EmeraldCompass,
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
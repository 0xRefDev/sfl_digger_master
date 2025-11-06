import { useState } from "react";
import quest from "@/data/quest.json";
import { QuestCard } from "@/components/QuestCard";
import { Bounce } from "react-awesome-reveal";
import { GoBack } from "@/components/GoBack";

export function PumpkinQuest() {
  const [activeSelection, setActiveSelection] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSelection = (questIndex, choiceIndex, choice) => {
    setActiveSelection({ questIndex, choiceIndex, choice });
  };

  const clearSelection = () => {
    setActiveSelection(null);
  };

  const handleChange = (value) => {
    setSearchValue(value);
  };

  const filteredQuest =
    searchValue === ""
      ? []
      : quest.filter(
          (q) =>
            q.quest_name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        );

  return (
    <>
      <main className="flex flex-col items-center p-4 pt-8">
        <header className="flex items-center justify-center w-fit relative">
          <GoBack />
          <h1 className="text-5xl font-bold">Pumpkin Quest</h1>
        </header>
        <div className="w-full flex justify-center">
          <div className="relative w-[25rem]">
            <input
              type="text"
              placeholder="Search your Telegram Bot Mission..."
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              className="bg-[#0C142A] border-2 border-white/30 p-2 w-full max-w-[500px] rounded-full mt-4 pl-12 outline-none mx-auto"
            />
          </div>
        </div>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 place-items-center">
          <Bounce triggerOnce>
            {filteredQuest.length === 0
              ? quest.map(
                  ({ quest_name, description, choices, outcomes }, index) => (
                    <QuestCard
                      key={index}
                      questIndex={index}
                      name={quest_name}
                      description={description}
                      choices={choices}
                      outcomes={outcomes}
                      activeSelection={activeSelection}
                      onSelectChoice={handleSelection}
                      onClearChoice={clearSelection}
                    />
                  )
                )
              : filteredQuest.map(
                  ({ quest_name, description, choices, outcomes }, index) => (
                    <QuestCard
                      key={index}
                      questIndex={index}
                      name={quest_name}
                      description={description}
                      choices={choices}
                      outcomes={outcomes}
                      activeSelection={activeSelection}
                      onSelectChoice={handleSelection}
                      onClearChoice={clearSelection}
                    />
                  )
                )}
          </Bounce>
        </section>
      </main>
    </>
  );
}

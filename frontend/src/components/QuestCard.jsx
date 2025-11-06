export function QuestCard({
  questIndex,
  name,
  description,
  choices,
  outcomes,
  activeSelection,
  onSelectChoice,
  onClearChoice,
}) {
  const isActive = activeSelection && activeSelection.questIndex === questIndex;

  const handleSelectedChoice = (choice, choiceIndex) => {
    if (isActive && activeSelection.choiceIndex === choiceIndex) {
      onClearChoice();
    } else {
      onSelectChoice(questIndex, choiceIndex, choice);
    }
  };

  return (
    <article
      className="p-4 bg-[#0C142A] rounded-2xl border-2 border-white/10 shadow-lg shadow-[#fff]/5 w-[29rem] flex flex-col gap-4 transition-all"
      id="quest_card"
    >
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="w-[14rem] truncate" title={description}>
            {description}
          </p>
        </div>
        <div>
          <ul className="bg-white/10 p-2 w-[12rem] rounded-lg border-2 border-white/10 flex flex-col gap-3">
            {choices.map((choice, i) => (
              <li
                key={i}
                className={`text-sm rounded cursor-pointer transition-colors ${
                  isActive && activeSelection.choiceIndex === i
                    ? "bg-white/20 px-2 py-[0.10rem] text-white font-bold"
                    : "text-white/70 hover:bg-white/15"
                }`}
                onClick={() => {
                  handleSelectedChoice(choice, i);
                }}
              >
                {choice}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isActive && (
        <>
          <div className="transition-all interpolate">
            <h3 className="font-medium text-lg mb-1">
              {activeSelection.choice}
            </h3>
            <span className="w-full h-[0.15rem] rounded bg-white/10 block"></span>
            <p>{outcomes[activeSelection.choiceIndex]}</p>
            {activeSelection.choiceIndex === 0 && (activeSelection.choice !== "👸 Queen Victoria" && activeSelection.choice !== "🧙 Wizard") && (
              <p>{outcomes[2]}</p>
              
            )}
          </div>
        </>
      )}
    </article>
  );
}

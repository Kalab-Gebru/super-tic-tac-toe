import { useEffect } from "react";
import Blocks from "./components/Blocks";
import Player from "./components/player";
import { useData } from "./context/DataProvider";

function App() {
  const { currentPlayer, boardData, currentBlock, func } = useData();

  function handleKeyDown(e) {
    console.log(currentBlock);
    if (
      (e.keyCode >= 48 && e.keyCode <= 56) ||
      (e.keyCode >= 96 && e.keyCode <= 104)
    ) {
      const pressed = e.keyCode <= 57 ? e.keyCode - 48 : e.keyCode - 96;

      if (currentBlock === "any") {
        console.log(pressed);
        func().setCurrentBlock(pressed);
      } else {
        console.log(pressed);
        func().markCall(pressed, currentBlock);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentBlock, boardData]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-100">
        <h1 className="p-2 mb-12 font-bold text-transparent text-8xl font-mark bg-gradient-to-r from-blue-400 via-green-400 to-red-400 bg-clip-text">
          Super Tic Tac Toe
        </h1>
        <div className="flex items-center justify-around w-full h-full">
          <Player player={1} active={currentPlayer == 0} />
          <Blocks />
          <Player player={2} active={currentPlayer == 1} />
        </div>
      </div>
    </>
  );
}

export default App;

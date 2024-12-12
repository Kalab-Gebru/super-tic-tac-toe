import React from "react";
import Cell from "./Cell";
import { useData } from "../context/DataProvider";

export default function Blocks() {
  const { boardData, wins, gameStatus, currentBlock, setCurrentBlock, func } =
    useData();

  if (!boardData) return null;

  function restart() {
    func().restart();
  }

  function getGridStyle(index) {
    switch (index) {
      case 0:
        return `border-r-8 border-b-8`;
      case 1:
        return `border-b-8`;
      case 2:
        return `border-l-8 border-b-8`;
      case 3:
        return `border-r-8`;
      case 4:
        return "";
      case 5:
        return `border-l-8`;
      case 6:
        return `border-t-8 border-r-8`;
      case 7:
        return `border-t-8`;
      case 8:
        return `border-t-8 border-l-8`;
      default:
        return "";
    }
  }
  function getGridStyle2(index) {
    switch (index) {
      case 0:
        return `border-r-2 border-b-2`;
      case 1:
        return `border-b-2`;
      case 2:
        return `border-l-2 border-b-2`;
      case 3:
        return `border-r-2`;
      case 4:
        return "";
      case 5:
        return `border-l-2`;
      case 6:
        return `border-t-2 border-r-2`;
      case 7:
        return `border-t-2`;
      case 8:
        return `border-t-2 border-l-2`;
      default:
        return "";
    }
  }

  return (
    <div className="flex items-center justify-center w-full max-w-[720px] border-2 border-gray-300 rounded-xl aspect-square bg-gray-50 overflow-hidden">
      {!gameStatus.GameOver ? (
        <div className="flex flex-wrap w-full h-full">
          {boardData?.map((bl, i) => {
            if (wins[i].win) {
              return (
                <div
                  key={i}
                  className={
                    `relative flex flex-wrap w-1/3 aspect-square border-gray-300 bg-slate-200 ` +
                    getGridStyle(i)
                  }
                >
                  <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                    <div
                      className={`text-black-100 text-[100px] font-mark ${
                        wins[i].value == "X" ? "text-blue-700" : "text-red-700"
                      }`}
                    >
                      {wins[i].value}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={i}
                  className={
                    `relative flex flex-wrap w-1/3 aspect-square ${
                      currentBlock != "any" &&
                      currentBlock != i &&
                      "bg-gray-200"
                    } border-gray-300 ` + getGridStyle(i)
                  }
                >
                  {currentBlock == "any" && (
                    <div
                      onClick={() => setCurrentBlock(i)}
                      className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-gray-200 cursor-pointer opacity-60"
                    >
                      <div className="font-mark text-[100px] text-black ">
                        {bl.no}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="flex flex-wrap w-[95%] h-[95%]">
                      {bl.boards?.map((data, j) => {
                        return (
                          <div
                            key={`B${i}c${j}`}
                            className={
                              `w-1/3 h-1/3 border-gray-300 ` + getGridStyle2(j)
                            }
                          >
                            <Cell
                              data={data}
                              blno={i}
                              func={func}
                              currentBlock={currentBlock}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 text-5xl font-bold text-transparent font-mark bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text">
              Game Over
            </div>
            {gameStatus.Winner == "Draw" ? (
              <div className="font-bold text-transparent text-7xl font-mark bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                The Game Ended In Draw
              </div>
            ) : (
              <div className="p-2 font-bold text-transparent text-8xl font-mark bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                Player{" "}
                <span
                  className={
                    gameStatus.Winner == 1 ? "text-blue-700" : "text-red-700"
                  }
                >
                  {gameStatus.Winner}
                </span>{" "}
                Won
              </div>
            )}

            <button
              onClick={restart}
              className="px-6 py-2 mt-12 text-2xl text-white bg-blue-500 rounded"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

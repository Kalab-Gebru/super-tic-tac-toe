import React, { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

const empityboards = Array.from({ length: 9 }).map((_, i) => {
  return {
    no: i,

    boards: Array.from({ length: 9 }).map((_, j) => {
      return {
        blno: i,
        no: j,
        value: undefined,
      };
    }),
  };
});

const empityWin = Array.from({ length: 9 }).map((_, i) => {
  return {
    no: i,
    win: false,
    value: undefined,
  };
});

export function DataProvider({ children }) {
  const [boardData, setBoardData] = useState(empityboards);
  const [wins, setWins] = useState(empityWin);
  const [gameStatus, setGameStatus] = useState({
    GameOver: false,
    Winner: undefined,
  });
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentBlock, setCurrentBlock] = useState("any");
  const [nextBlock, setNextBlock] = useState();

  function checkBlockWin(setectedCell) {
    let Win = false;
    let playerValue;

    let cell = setectedCell;

    if (
      cell[0]?.value != undefined &&
      cell[0]?.value == cell[1]?.value &&
      cell[1]?.value == cell[2]?.value
    ) {
      playerValue = cell[0]?.value;
      Win = true;
    } else if (
      cell[3]?.value != undefined &&
      cell[3]?.value == cell[4]?.value &&
      cell[4]?.value == cell[5]?.value
    ) {
      playerValue = cell[3]?.value;
      Win = true;
    } else if (
      cell[6]?.value != undefined &&
      cell[6]?.value == cell[7]?.value &&
      cell[7]?.value == cell[8]?.value
    ) {
      playerValue = cell[6]?.value;
      Win = true;
    } else if (
      cell[0]?.value != undefined &&
      cell[0]?.value == cell[3]?.value &&
      cell[3]?.value == cell[6]?.value
    ) {
      playerValue = cell[0]?.value;
      Win = true;
    } else if (
      cell[1]?.value != undefined &&
      cell[1]?.value == cell[4]?.value &&
      cell[4]?.value == cell[7]?.value
    ) {
      playerValue = cell[1]?.value;
      Win = true;
    } else if (
      cell[2]?.value != undefined &&
      cell[2]?.value == cell[5]?.value &&
      cell[5]?.value == cell[8]?.value
    ) {
      playerValue = cell[2]?.value;
      Win = true;
    } else if (
      cell[2]?.value != undefined &&
      cell[2]?.value == cell[4]?.value &&
      cell[4]?.value == cell[6]?.value
    ) {
      playerValue = cell[2]?.value;
      Win = true;
    } else if (
      cell[0]?.value != undefined &&
      cell[0]?.value == cell[4]?.value &&
      cell[4]?.value == cell[8]?.value
    ) {
      playerValue = cell[0]?.value;
      Win = true;
    }

    return { Win, playerValue };
  }

  useEffect(() => {
    if (currentBlock != "any") {
      const { Win, playerValue } = checkBlockWin(
        boardData[currentBlock].boards
      );

      if (Win) {
        console.log("dd");
        setWins((pre) =>
          pre.map((bl) => {
            if (bl.no == currentBlock) {
              return { no: currentBlock, win: true, value: playerValue };
            }
            return bl;
          })
        );
      }
      if (wins[nextBlock].win || (Win && currentBlock == nextBlock)) {
        setCurrentBlock("any");
      } else {
        setCurrentBlock(nextBlock);
      }
    }
  }, [boardData]);

  useEffect(() => {
    const { Win, playerValue } = checkBlockWin(wins);
    if (Win) {
      setGameStatus({ GameOver: true, Winner: playerValue == "O" ? 0 : 1 });
    } else if (wins.every((w) => w.value != undefined)) {
      setGameStatus({ GameOver: true, Winner: "Draw" });
    }
  }, [wins]);

  useEffect(() => {
    console.log(currentBlock);
  }, [currentBlock]);

  const func = () => {
    return {
      markCall: (no, blno = currentBlock) => {
        if (boardData[blno].boards[no].value == undefined) {
          setBoardData((pre) =>
            pre.map((bl) => {
              if (bl.no == blno) {
                return {
                  ...bl,
                  boards: bl.boards.map((cl) => {
                    if (cl.no == no) {
                      return {
                        ...cl,
                        value: !cl.value && (currentPlayer == 0 ? "X" : "O"),
                      };
                    }
                    return cl;
                  }),
                };
              }
              return bl;
            })
          );
          setCurrentPlayer((pre) => (pre + 1) % 2);
          setNextBlock(no);
        }
      },
      restart: () => {
        console.log("yes");
        setBoardData(empityboards);
        setWins(empityWin);
        setGameStatus({
          GameOver: false,
          Winner: undefined,
        });
        setCurrentPlayer(0);
        setCurrentBlock("any");
      },
      setCurrentBlock: (no, blno = currentBlock) => {
        if (!wins[no].win) {
          setCurrentBlock(no);
        }
        console.log(blno);
      },
    };
  };

  return (
    <DataContext.Provider
      value={{
        boardData,
        setBoardData,
        wins,
        gameStatus,
        setGameStatus,
        currentPlayer,
        setCurrentPlayer,
        currentBlock,
        setCurrentBlock,
        func,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

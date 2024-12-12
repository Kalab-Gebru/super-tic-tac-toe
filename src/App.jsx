import { useEffect, useContext, useState } from "react";
import Blocks from "./components/Blocks";
import Player from "./components/Player";
import { useData } from "./context/DataProvider";
import { webAppContext } from "./context/appContext";

function App() {
  const { currentPlayer, boardData, currentBlock, func } = useData();
  const app = useContext(webAppContext);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if we're in development mode
        const isDevelopment = process.env.NODE_ENV === "development";

        // Check if we're in a mobile Telegram environment or in development mode
        if (
          (app.initDataUnsafe &&
            app.initDataUnsafe.user &&
            app.platform === "android") ||
          app.platform === "ios" ||
          isDevelopment
        ) {
          let telegramUserId, telegramUsername;

          if (isDevelopment) {
            // Use default values for development
            telegramUserId = "0911099015";
            telegramUsername = "devUser";
          } else {
            // Use actual Telegram data
            telegramUserId = app.initDataUnsafe.user.id;
            telegramUsername = app.initDataUnsafe.user.username || "noName";
          }

          setUserId(telegramUserId);
          setUsername(telegramUsername);

          // Initialize game data
          await gameRepository.initialize(telegramUserId);

          if (app.expand) {
            app.expand();
          }
          if (app.setHeaderColor) {
            app.setHeaderColor("#000000");
          }

          setIsInitialized(true);
        } else {
          throw new Error("Not a mobile Telegram environment");
        }
      } catch (err) {
        console.error("Initialization error:", err);
        setError(err);
      }
    };

    initializeApp();
  }, [app]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-100">
        <h1 className="p-2 mb-12 text-5xl font-bold text-transparent font-mark bg-gradient-to-r from-blue-400 via-green-400 to-red-400 bg-clip-text">
          Super Tic Tac Toe
        </h1>
        <div className="mb-4 text-2xl font-bold">{username}</div>
        <div className="flex items-center justify-around w-full h-full px-10">
          {/* <Player player={1} active={currentPlayer == 0} /> */}
          <Blocks />
          {/* <Player player={2} active={currentPlayer == 1} /> */}
        </div>
      </div>
    </>
  );
}

export default App;

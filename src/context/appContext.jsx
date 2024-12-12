import React, { createContext, useEffect, useState } from "react";

export const webAppContext = createContext({});

const WebAppProvider = ({ children }) => {
  const [app, setApp] = useState({});

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setApp(window.Telegram.WebApp);
      window.Telegram.WebApp.ready();
    }
  }, []);

  return (
    <webAppContext.Provider value={app}>{children}</webAppContext.Provider>
  );
};

export default WebAppProvider;

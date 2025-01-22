/* eslint-disable no-unused-vars */
import { useState, createContext } from "react";
import { mocksettings } from "../constants";

const SettingContext = createContext({});

export function SettingContextProvider({ children }) {
  const [settings, setSettings] = useState(mocksettings);

  return (
    <SettingContext.Provider value={settings}>
      {children}
    </SettingContext.Provider>
  );
}

export default SettingContext
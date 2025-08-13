import { createContext, useState } from "react";

export const RatesContext = createContext();

export default function RatesProvider({ children }) {
  const [rates, setRates] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  return (
    <RatesContext.Provider
      value={{ rates, setRates, lastUpdated, setLastUpdated }}
    >
      {children}
    </RatesContext.Provider>
  );
}

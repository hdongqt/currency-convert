import { createContext, createRef, useRef, useState } from "react";
import { LIST_NAV } from "./../constants/navbar";

// eslint-disable-next-line
export const RatesContext = createContext();

export default function RatesProvider({ children }) {
  const sectionRefs = useRef(
    LIST_NAV.reduce((acc, nav) => {
      acc[nav.section] = createRef();
      return acc;
    }, {})
  );

  const [rates, setRates] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  return (
    <RatesContext.Provider
      value={{ rates, setRates, lastUpdated, setLastUpdated, sectionRefs }}
    >
      {children}
    </RatesContext.Provider>
  );
}

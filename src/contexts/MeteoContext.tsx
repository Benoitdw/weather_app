import { createContext, useState } from "react";
import { MeteoType } from "../common/type";

export interface MeteoContextType {
  meteo: MeteoType | null;
  setMeteo: React.Dispatch<React.SetStateAction<MeteoType>>;
}

export const MeteoContext = createContext<MeteoContextType | null>(null);

interface MeteoProviderProps {
    children: React.ReactNode;
  }

export default  function MeteoProvider({ children }: MeteoProviderProps) {
    const [meteo, setMeteo] = useState<MeteoType | null >(null);

    return (
      <MeteoContext.Provider value={{ meteo, setMeteo }}>
        {children}
      </MeteoContext.Provider>
    );

}

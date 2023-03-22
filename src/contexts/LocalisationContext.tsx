import { createContext, useState } from "react";
import { City } from "../common/type";

export interface LocalisationContextType {
  localisation: City | null;
  setLocalisation: React.Dispatch<React.SetStateAction<City | null>>;
}

export const LocalisationContext = createContext<LocalisationContextType | null>(null);

interface LocalisationProviderProps {
    children: React.ReactNode;
  }

export default function LocalisationProvider({ children }: LocalisationProviderProps) {

    const [localisation, setLocalisation] = useState<City | null>(null);
    return (
      <LocalisationContext.Provider value={{localisation, setLocalisation}}>
        {children}
      </LocalisationContext.Provider>
    );

}

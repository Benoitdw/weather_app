import { createContext, useState } from "react";
import { Localisation } from "../common/type";

export interface LocalisationContextType {
  localisation: Localisation | null;
  setLocalisation: React.Dispatch<React.SetStateAction<Localisation | null>>;
}

const defaultLocalisation = {
  localisation: null
}
export const LocalisationContext = createContext<LocalisationContextType | null>(null);

interface LocalisationProviderProps {
    children: React.ReactNode;
  }

export default function LocalisationProvider({ children }: LocalisationProviderProps) {

    const [localisation, setLocalisation] = useState<Localisation | null>(defaultLocalisation.localisation);

    return (
      <LocalisationContext.Provider value={{localisation, setLocalisation}}>
        {children}
      </LocalisationContext.Provider>
    );

}

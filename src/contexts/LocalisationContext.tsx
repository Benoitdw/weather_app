import { createContext, useState } from "react";
import { Localisation } from "../common/type";

export interface LocalisationContextType {
  localisation: Localisation;
  setLocalisation: React.Dispatch<React.SetStateAction<Localisation>>;
}

const defaultLocalisation = {
  localisation: {latitude: 50.72, longitude: 4.6}
}
export const LocalisationContext = createContext<LocalisationContextType | null>(null);

interface LocalisationProviderProps {
    children: React.ReactNode;
  }

export default function LocalisationProvider({ children }: LocalisationProviderProps) {
    const [localisation, setLocalisation] = useState(defaultLocalisation.localisation);

    return (
      <LocalisationContext.Provider value={{localisation, setLocalisation}}>
        {children}
      </LocalisationContext.Provider>
    );

}

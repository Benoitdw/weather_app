import { createContext, useContext } from "react";
import WeatherApiClient from "../WeatherApiClient"

const ApiContext = createContext<WeatherApiClient| null>(null);

export default function ApiProvider({children}:any) {
    const api = new WeatherApiClient();
    return (<ApiContext.Provider value ={api}>
        {children}
    </ApiContext.Provider>);
}

export function useApi() {
    return useContext(ApiContext);
}

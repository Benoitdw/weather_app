import { Header, NextDays, WeatherInfo } from "../components";
import { Nav } from "../components";
import {  useContext, useEffect } from "react";
import { MeteoContext, MeteoContextType } from "../contexts/MeteoContext";
import {
  LocalisationContext,
  LocalisationContextType,
} from "../contexts/LocalisationContext";
import { useApi } from "../contexts/ApiProvider";
import WeatherApiClient from "../WeatherApiClient";
import {getMeteoCall, getClientPosition} from "../utils";

const MainPage = () => {
  const { localisation, setLocalisation } = useContext(
    LocalisationContext
  ) as LocalisationContextType;
  const { meteo, setMeteo } = useContext(MeteoContext) as MeteoContextType;
  const api = useApi() as WeatherApiClient;

  useEffect(() => {
    (async () => {
      console.log(localisation)
      if (!localisation) {
        setLocalisation(getClientPosition());
      }
      if(localisation){
        const response = await api.get(getMeteoCall(localisation));
        if (response.ok) {
          setMeteo(await response.body);
        }
      }
    })();
  }, [localisation]);

  return (
    <>
      <Nav is_main={true} />
      <div className="px-4">
        <Header/>
        <WeatherInfo />
        <NextDays />
      </div>
    </>
  );
};

export default MainPage;

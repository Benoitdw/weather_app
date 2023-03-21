import {Header,  NextDays, WeatherInfo} from '../components';
import { Nav } from '../components';
import getMeteo from "../utils/UpdateMeteo";
import { Localisation } from "../common/type";
import { useState, useContext, useEffect } from "react";
import { MeteoContext, MeteoContextType } from "../contexts/MeteoContext";
import { LocalisationContext, LocalisationContextType } from '../contexts/LocalisationContext';
import { MeteoType } from "../common/type";
import { useApi } from "../contexts/ApiProvider";
import WeatherApiClient from "../WeatherApiClient";
import getMeteoCall from "../utils/UpdateMeteo";

const MainPage = () => {
  const {localisation, setLocalisation} = useContext(LocalisationContext) as LocalisationContextType
  const { meteo, setMeteo } = useContext(MeteoContext) as MeteoContextType;
  const api = useApi() as WeatherApiClient;
  

  useEffect(() => {
    (async () => {
      console.log(localisation)
      const response = await api.get(getMeteoCall(localisation));
      if (response.ok) {
        setMeteo(await response.body)
      }
    })();
  }, [localisation]);



  return (
    <>
      <Nav is_main={true} />
      <div className='px-4'>
        <Header city="Wavre" country="Belgium" />
        <WeatherInfo />
        <NextDays />
      </div>
  </>
  )
}

export default MainPage
import { useState, useEffect, useContext } from "react";
import { MeteoContext, MeteoContextType } from "../contexts/MeteoContext";

import VMO from "../constants/VMO";

interface WeatherDetailProps {
  icon?: string;
  type?: string;
  value?: string;
}

interface CurrentWeather {
  temperature: number;
  vmo: { icon: string; label: string };
  details: Array<WeatherDetailProps>;
}

const WeatherDetail = ({ icon, type, value }: WeatherDetailProps) => {
  return (
    <div className="bg-white/40 rounded-lg px-4 py-2 flex gap-2 items-center">
      <div className="h-8 w-8 bg-white drop-shadow-xl p-1 rounded-lg flex justify-center items-center ">
        <i className={icon}></i>
      </div>
      <div>{type}</div>
      <div className="ml-auto">{value}</div>
    </div>
  );
};

const WeatherInfo = () => {
  const { meteo } = useContext(MeteoContext) as MeteoContextType;
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>({
    temperature: 0,
    vmo: { icon: "loading.png", label: "loading" },
    details: [
      { icon: "ri-cloud-windy-line", type: "Wind", value: "" },
      { icon: "ri-rainy-line", type: "RainFall", value: "" },
      { icon: "ri-drop-fill", type: "Humidity", value: "" },
    ],
  });

  useEffect(() => {
    if (meteo !== null) {
      let details = currentWeather.details;
      details[0].value = meteo.current_weather.windspeed + "Km/h";
      details[1].value =
        meteo.hourly.precipitation[
          meteo.hourly.time.indexOf(meteo.current_weather.time)
        ] + "mm";
      details[2].value =
        meteo.hourly.relativehumidity_2m[
          meteo.hourly.time.indexOf(meteo.current_weather.time)
        ] + "%";
      setCurrentWeather({
        temperature: meteo.current_weather.temperature,
        vmo: VMO[meteo.current_weather.weathercode],
        details: details,
      });
    }
  }, [meteo]);


  const weather_icon = "./assets/weather_icons/" + currentWeather.vmo.icon;
  return (
    <div className="pb-4">
      <div className="flex justify-center justify-items-center">
        <div className="w-48 overflow-hidden ">
          <img src={weather_icon} className="transform scale-[2.5]" />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <div className="flex">
            <h1 className="font-[1000] font- text text-7xl">
              {currentWeather.temperature}
            </h1>
            <h2>°C</h2>
          </div>

          <h3>{currentWeather.vmo.label}</h3>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {currentWeather.details.map((val, index) => (
          <WeatherDetail key={index} {...val} />
        ))}
      </div>
    </div>
  );
};

export default WeatherInfo;

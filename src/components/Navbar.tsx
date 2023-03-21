import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { MeteoContext, MeteoContextType } from "../contexts/MeteoContext";
import { useApi } from "../contexts/ApiProvider";
import WeatherApiClient from "../WeatherApiClient";
import { Localisation } from "../common/type";

const Nav = () => {
  const [location, setLocation] = useState<Localisation>({
    longitude: 4.6,
    latitude: 50.72,
  }); //todo remove hardcoded value
  const [toggle, setToggle] = useState(false);
  const { meteo, setMeteo } = useContext(MeteoContext) as MeteoContextType;
  const api = useApi() as WeatherApiClient;

  useEffect(() => {
    (async () => {
      const current_date = new Date(Date.now());
      const response = await api.get(
        `/forecast?latitude=${location.latitude}&longitude=${
          location.longitude
        }&current_weather=true&start_date=${format(
          current_date,
          "yyyy'-'MM'-'d"
        )}&end_date=${format(
          current_date.setDate(current_date.getDate() + 7),
          "yyyy'-'MM'-'dd"
        )}&hourly=relativehumidity_2m&hourly=precipitation&hourly=weathercode&hourly=temperature_2m`
      );
      if (response.ok) {
        setMeteo(await response.body);
      }
    })();
  }, [location]);

  const HandleSearch = () => {
    setLocation({ longitude: 30.6, latitude: 40.72 });
  };

  return (
    <nav className="flex h-[48px] justify-between w-full text-[24px] semi-bold">
      <div>
        <button className="h-full" onClick={() => HandleSearch()}>
          <i className="m-[12px] ri-search-2-line"></i>
        </button>
      </div>
      <div>
        <button className="h-full" onClick={() => setToggle(!toggle)}>
          {!toggle ? (
            <i className="m-[12px] ri-settings-3-line"></i>
          ) : (
            <i className="m-[12px] ri-close-fill"></i>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Nav;

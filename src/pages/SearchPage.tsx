import { Nav } from "../components";
import getMeteo from "../utils/GetMeteoCall";
import { Localisation } from "../common/type";
import { useState, useContext, useEffect } from "react";
import { MeteoContext, MeteoContextType } from "../contexts/MeteoContext";
import { MeteoType } from "../common/type";
import { useApi } from "../contexts/ApiProvider";
import WeatherApiClient from "../WeatherApiClient";
import getMeteoCall from "../utils/GetMeteoCall";
import {
  LocalisationContext,
  LocalisationContextType,
} from "../contexts/LocalisationContext";
import { useNavigate } from "react-router-dom";

// TODO see https://dev.to/karan316/build-forms-using-react-the-easy-way-with-typescript-46bh to better form

const SearchPage = () => {
  const navigate = useNavigate();
  const { localisation, setLocalisation } = useContext(
    LocalisationContext
  ) as LocalisationContextType;

  const [newLocalisation, setNewLocalisation] =
    useState<Localisation>({longitude:0, latitude:0});

  const handleSubmit = () => {
    setLocalisation(newLocalisation);
    navigate("/");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocalisation({
      ...newLocalisation,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Nav is_main={false} />
      <div className="px-4">
        <form onSubmit={() => handleSubmit()} className="flex flex-col gap-10">
          <label>
            Latitude:
            <input
              name="latitude"
              id="latitude"
              type="number"
              value={newLocalisation.latitude}
              onChange={onChange}
            />
          </label>
          <label>
            Longitude:
            <input
              name="longitude"
              id="longitude"
              type="number"
              value={newLocalisation.longitude}
              onChange={onChange}
            />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
};

export default SearchPage;

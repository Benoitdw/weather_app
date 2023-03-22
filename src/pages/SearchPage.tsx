import { Nav } from "../components";
import { City } from "../common/type";
import {  useContext} from "react";

import {
  LocalisationContext,
  LocalisationContextType,
} from "../contexts/LocalisationContext";
import { useNavigate } from "react-router-dom";
import {usePlacesWidget} from "react-google-autocomplete";

// TODO see https://dev.to/karan316/build-forms-using-react-the-easy-way-with-typescript-46bh to better form

const SearchPage = () => {
  const navigate = useNavigate();
  const { localisation, setLocalisation } = useContext(
    LocalisationContext
  ) as LocalisationContextType;

  const onChange = (place: any) => {
    let newLocation: City = {
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      name: place.address_components[0].long_name,
      country: place.address_components[3]?.long_name,
      state: place.address_components[1]?.long_name,
    };
    setLocalisation(newLocation);
    navigate('/')
  };

  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    onPlaceSelected: (place) => onChange(place),
    options: {
      types: ["(regions)"],
    },
    language: "en",
  });

  return (
    <>
      <Nav is_main={false} />
      <div  className="px-4 h-screen flex flex-col place-items-center justify-center ">
        <input ref={ref} className="bg-white/40 rounded-lg px-4 py-2 text-xl w-full"/>
      </div>
    </>
  );
};

export default SearchPage;

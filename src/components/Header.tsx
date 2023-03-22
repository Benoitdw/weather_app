import {format } from 'date-fns'
import {  useContext} from "react";

import {
  LocalisationContext,
  LocalisationContextType,
} from "../contexts/LocalisationContext";


const Header = () => {
    const { localisation, setLocalisation } = useContext(
        LocalisationContext
      ) as LocalisationContextType;

    return (
        <div className=" py-2">
            <h2 className="text-4xl font-bold">{localisation?.name},<br/>{localisation?.country}</h2>
            <h3 className="text-[#9A938C] text-xm leading-6">{format(new Date(), "eee',' do LLLL")}</h3>
        </div>
    )
}

export default Header 
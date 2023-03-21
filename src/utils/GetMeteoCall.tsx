import { format } from "date-fns";
import { Localisation } from "../common/type";


const getMeteoCall = ( localisation: Localisation) => {
    const current_date = new Date(Date.now());
    return  `/forecast?latitude=${localisation.latitude}&longitude=${
        localisation.longitude
      }&current_weather=true&start_date=${format(
        current_date,
        "yyyy'-'MM'-'d"
      )}&end_date=${format(
        current_date.setDate(current_date.getDate() + 7),
        "yyyy'-'MM'-'dd"
      )}&hourly=relativehumidity_2m&hourly=precipitation&hourly=weathercode&hourly=temperature_2m`

};

export default getMeteoCall;

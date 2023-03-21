import { useState, useEffect, useContext } from "react";
import { MeteoContext, MeteoContextType } from "../contexts/MeteoContext";
import { useNavigate } from "react-router-dom";
import VMO from "../constants/VMO";
import { format } from "date-fns";

interface HourProps {
  dateToFetch: Date;
}
const Hours = ({ dateToFetch }: HourProps) => {
  const { meteo } = useContext(MeteoContext) as MeteoContextType;
  const [hours, setHours] = useState(Array());

  useEffect(() => {
    let newDetails = Array();

    meteo?.hourly.time.forEach((value, index) => {
      let valueDate = new Date(value);
      if (valueDate.getDate() == dateToFetch.getDate()) {
        let details = {
          date: valueDate,
          weather_icon:
            "./assets/weather_icons/" +
            VMO[meteo.hourly.weathercode[index]].icon,
          temperature: meteo.hourly.temperature_2m[index],
        };
        newDetails.push(details);
      }
    });
    setHours(newDetails);
  }, [dateToFetch, meteo]);

  return (
    <div className="overflow-x-auto mt-4 flex gap-2">
      {hours.length != 0
        ? hours.map((value, index) => {
            return (
              <div className="bg-white/30 snap-center shrink-0 w-[40px] h-[70px] rounded-full flex flex-col content-center items-center text-[#9C9EAA] text-xs justify-center py-1">
                <div>{format(value.date, "HH':'mm")}</div>
                <div className="w-6 overflow-hidden -mt-1 ">
                  <img
                    src={value.weather_icon}
                    className="transform scale-[2.5]"
                  />
                </div>
                <div className="text-primary font-bold">
                  {value.temperature}°
                </div>
              </div>
            );
          })
        : "Loading"}
    </div>
  );
};

interface DayProps {
  name: string;
  is_active: boolean;
  onClick: Function;
  classAdditionalName?: string;
}
const Day = ({ name, is_active, onClick, classAdditionalName }: DayProps) => {
  return (
    <div className={classAdditionalName}>
      <div
        onClick={() => onClick()}
        className={`${
          is_active
            ? "text-primary  font-semibold after:block after:absolute after:inset-4 after:rounded-full  after:-bottom-[10px] after:top-[27px] after:bg-primary relative inline-block "
            : ""
        } cursor-pointer`}
      >
        {name}
      </div>
      {is_active ? "" : ""}
    </div>
  );
};

const HoursDetail = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [active, setActive] = useState(0);

  const handleClick = (index: number) => {
    const today = new Date();
    setActive(index);
    let oldDate = new Date(date);
    oldDate.setDate(today.getDate() + index);
    setDate(oldDate);
  };

  return (
    <>
      <div className="flex text-3 gap-3 text-secondary text-sm">
        <Day
          onClick={() => handleClick(0)}
          name="Today"
          is_active={active === 0}
        />
        <Day
          onClick={() => handleClick(1)}
          name="Tomorrow"
          is_active={active === 1}
        />
        <Day
          onClick={() => navigate('/next_days')}
          classAdditionalName="ml-auto after:content-['>'] flex after:ml-2"
          name="Next 7 Days"
          is_active={active === 2}
        />
      </div>
      <div className="mt-2 h-[1px] bg-secondary" />

      <Hours dateToFetch={date} />
    </>
  );
};

export default HoursDetail;

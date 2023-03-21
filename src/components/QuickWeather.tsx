import {format } from 'date-fns'

interface Props {
    time: string,
    weather_icon: string
    temperature: number
}

const QuickWeather = ({city, country}:Props) => {
    return (
        <div className=" py-2 px-4">
            <h2 className="text-4xl font-bold">{city},<br/>{country}</h2>
            <h3 className="text-[#9A938C] text-xm leading-6">{format(new Date(), "eee',' do LLLL")}</h3>
        </div>
    )
}

export default QuickWeather 
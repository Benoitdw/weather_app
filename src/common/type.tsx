export interface MeteoType {
    latitude:              number;
    longitude:             number;
    generationtime_ms:     number;
    utc_offset_seconds:    number;
    timezone:              string;
    timezone_abbreviation: string;
    elevation:             number;
    current_weather:       CurrentWeather;
    hourly_units:          HourlyUnits;
    hourly:                Hourly;
}

interface CurrentWeather {
    temperature:   number;
    windspeed:     number;
    winddirection: number;
    weathercode:   number;
    time:          string;
}

interface Hourly {
    time:                string[];
    relativehumidity_2m: number[];
    precipitation:       number[];
    weathercode : number[];
    temperature_2m: number[];
}

interface HourlyUnits {
    time:                string;
    relativehumidity_2m: string;
    precipitation:       string;
}

export interface Localisation {
    latitude: number,
    longitude: number
}

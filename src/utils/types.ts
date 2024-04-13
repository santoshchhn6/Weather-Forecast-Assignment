export type LocationType = {
  geoname_id: string;
  name: string;
  ascii_name: string;
  alternate_names: string[];
  country_code: string;
  cou_name_en: string;
  population: number;
  dem: number;
  timezone: string;
  coordinates: {
    lon: number;
    lat: number;
  };
};

export type WeatherType = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

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

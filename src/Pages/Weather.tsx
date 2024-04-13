import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { useState } from "react";
import { WeatherType } from "../utils/types";
import { CgCompressV } from "react-icons/cg";
import { MdOutlineWaterDrop } from "react-icons/md";

const Weather = () => {
  const { city } = useParams();
  const { data } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b068fa159e3892cf87d92e098dd75844`
  );

  return (
    <div className="text-slate-700 text-2xl p-5">
      <Temperature data={data} />
      <WeatherDetails data={data} />
    </div>
  );
};

const Location = ({ data }) => {
  return (
    <div>
      <div className="flex text-3xl font-semibold">
        <p>{data?.name}</p>
        <p>, {data?.sys.country}</p>
        {/* <p>, {data?.timezone}</p> */}
      </div>

      <p className="font-semibold text-slate-500">
        {data?.coord.lon}, {data?.coord.lat}
      </p>
    </div>
  );
};

const Temperature = ({ data }) => {
  const [tempType, setTempType] = useState("celsius");
  const getTemp = (kelvin: number, type: string) => {
    switch (type) {
      case "celsius":
        return Math.round(kelvin - 273.15);
        break;

      case "fahrenheit":
        return Math.round((kelvin * 9) / 5 - 459.67);
        break;

      default:
        return Math.round(kelvin);
        break;
    }
  };
  return (
    <div>
      <div className="w-[40rem] bg-slate-300 px-[2rem] py-[1rem] rounded-[2rem]">
        <Location data={data} />
        <div className="flex my-10">
          <div>
            <select
              value={tempType}
              onChange={(e) => setTempType(e.target.value)}
              className="py-2 px-3 rounded-[0.5rem] text-lg"
            >
              <option value="celsius">Celsius</option>
              <option value="kelvin">Kelvin</option>
              <option value="fahrenheit">Fahrenheit</option>
            </select>
            <p className="mt-[5rem] text-[10rem] font-medium">
              {getTemp(data ? data?.main.temp : 0, tempType)}°
            </p>
          </div>
          <div className="ml-[1rem] -mt-[5.5rem]">
            <img
              src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`}
              alt=""
            />
            <p className="text-[3rem] font-semibold leading-[3rem]">
              {data?.weather[0].description}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[40rem] mt-[1rem] px-[2rem] py-[1rem] rounded-[2rem] bg-slate-300 flex justify-between gap-[1rem]">
        <p>Feel Like: {getTemp(data ? data?.main.feels_like : 0, tempType)}°</p>
        <p>Min Temp: {getTemp(data ? data?.main.temp_min : 0, tempType)}°</p>
        <p>Max Temp: {getTemp(data ? data?.main.temp_max : 0, tempType)}°</p>
      </div>
    </div>
  );
};

const WeatherDetails = ({ data }) => {
  return (
    <div className="w-[40rem] mt-[1rem] p-[2rem]  rounded-[2rem] bg-slate-300 ">
      <div className="w-[11rem] flex gap-3 items-center    ">
        <CgCompressV size={45} />
        <div>
          <p className=" font-semibold">Pressure</p>
          <p>{data?.main.pressure}</p>
        </div>
      </div>

      <div className="w-[11rem] flex gap-3 items-center    ">
        <MdOutlineWaterDrop size={45} />
        <div>
          <p className=" font-semibold">Humidity</p>
          <p>{data?.main.humidity}</p>
        </div>
      </div>

      <p>Humidity:{data?.main.humidity}</p>
      <p>visibility:{data?.visibility}</p>
      <p>wind:{data?.wind.speed}</p>
      {/* <p>wind direction:{data?.wind.deg}</p> */}
    </div>
  );
};

export default Weather;

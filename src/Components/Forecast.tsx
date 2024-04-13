import { useDispatch, useSelector } from "react-redux";
import useFetch from "../Hooks/useFetch";
import { getTemp } from "../utils/convertTemp";
import { RootState } from "../redux/store";
import { getWeekDay } from "../utils/getWeekDay";
import { getTime } from "../utils/getTime";
import { useState } from "react";
import { setForecastTime } from "../redux/appSlice";

type Props = {
  lat: number;
  lon: number;
};

const Forecast = ({ lat, lon }: Props) => {
  const { data } = useFetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );

  const { forecastTime } = useSelector((state: RootState) => state.app);
  let weekForecastWithTime = data?.list
    ?.map((day) => ({
      ...day,
      time: getTime(day ? day?.dt : 0),
    }))
    .filter((day) => day?.time == forecastTime);

  return (
    <div className="w-[40rem]  p-[2rem]  rounded-[2rem] bg-slate-300">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">This Week</h1>
        <SelectTime />
      </div>
      {weekForecastWithTime?.map((weekDay, index) => (
        <ForecastWeekDay key={index} data={weekDay} />
      ))}
    </div>
  );
};

const ForecastWeekDay = ({ data }) => {
  const { tempType } = useSelector((state: RootState) => state.app);
  return (
    <>
      <div className="flex items-center justify-between ">
        <div>
          <span>{getWeekDay(data ? data?.dt : 0)}</span>
          <span>, {data?.time}</span>
        </div>
        <div className="flex items-center">
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
            alt=""
          />
          <span>{data?.weather[0].description}</span>
        </div>
        <span>{getTemp(data ? data?.main.temp : 0, tempType)}°</span>
      </div>
      <hr />
    </>
  );
};

const SelectTime = () => {
  const { forecastTime } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  return (
    <select
      value={forecastTime}
      onChange={(e) => dispatch(setForecastTime(e.target.value))}
      className="p-2 text-center rounded-[0.5rem] bg-slate-200"
    >
      <option value="2:30 AM">2:30 AM</option>
      <option value="5:30 AM">5:30 AM</option>
      <option value="8:30 AM">8:30 AM</option>
      <option value="11:30 AM">11:30 AM</option>
      <option value="2:30 PM">2:30 PM</option>
      <option value="5:30 PM">5:30 PM</option>
      <option value="8:30 PM">8:30 PM</option>
      <option value="11:30 PM">11:30 PM</option>
    </select>
  );
};

export default Forecast;

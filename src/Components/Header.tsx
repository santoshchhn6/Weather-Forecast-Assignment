import { Link } from "react-router-dom";
import SearchCity from "./SearchCity";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTempType } from "../redux/appSlice";

const Header = () => {
  return (
    <div className="mb-3 pl-5 py-3 flex flex-wrap gap-5 items-center bg-slate-300">
      <Logo />
      <SearchCity />
      <SelectTemperature />
      {/* <HeaderLinks /> */}
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex gap-3 text-4xl font-bold ">
      <span className="text-slate-500">Weather</span>
      <span className="text-slate-600"> Forecast</span>
    </div>
  );
};

const HeaderLinks = () => {
  const link: { title: string; to: string }[] = [
    {
      title: "City",
      to: "/",
    },
    {
      title: "Weather",
      to: "/weather",
    },
  ];
  return (
    <div className="flex gap-3 text-slate-800 text-2xl font-medium">
      {link.map((item, index) => (
        <Link
          to={item.to}
          key={index}
          className=" text-slate-700 hover:text-slate-500 cursor-pointer"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

const SelectTemperature = () => {
  const { tempType } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  return (
    <select
      value={tempType}
      onChange={(e) => dispatch(setTempType(e.target.value))}
      className="bg-slate-200 py-2 px-3 rounded-[0.5rem] text-lg"
    >
      <option value="celsius">Celsius</option>
      <option value="kelvin">Kelvin</option>
      <option value="fahrenheit">Fahrenheit</option>
    </select>
  );
};

export default Header;

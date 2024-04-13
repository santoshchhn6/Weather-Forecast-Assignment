import { Link } from "react-router-dom";
import SearchCity from "./SearchCity";

const Header = () => {
  return (
    <div className="mb-3 pl-5 py-3 flex gap-5 items-center bg-slate-300">
      <Logo />
      <SearchCity />
      <HeaderLinks />
    </div>
  );
};

const Logo = () => {
  return (
    <div className="text-4xl font-bold">
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

export default Header;

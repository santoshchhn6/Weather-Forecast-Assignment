import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchCity = () => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { locations } = useSelector((state: RootState) => state.locations);
  const cities = locations
    .map((item) => item.name)
    .filter((item) =>
      item.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate(`/weather/${search}`);

    console.log(search);
  };
  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center w-[300px] bg-slate-200 py-2 px-3 outline-none rounded-[0.5rem]"
      >
        <input
          type="text"
          placeholder="Enter City Name"
          className="bg-transparent outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <IoSearch size={24} className="text-slate-700" />
      </form>
      {isFocused && search ? <SearchList results={cities} /> : null}
    </div>
  );
};

type SearchListProps = {
  results: string[];
};
const SearchList = ({ results }: SearchListProps) => {
  const navigate = useNavigate();
  return (
    <>
      {results.length ? (
        <div className="absolute top-12 w-[300px] max-h-[300px]  bg-slate-200 rounded-[0.5rem] shadow-md overflow-y-auto">
          {results.map((result, index) => (
            <p
              key={index}
              className="text-slate-700 p-2 hover:bg-slate-300 cursor-pointer"
              onSelect={(event) => {
                event.stopPropagation();
                navigate(`/weather/${result}`);
              }}
            >
              {result}
            </p>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default SearchCity;

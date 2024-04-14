import { useEffect, useState } from "react";
import LocationTable from "../Components/Table/LocationTable";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../redux/locationSlice";
import useGeolocation from "../Hooks/useGeolocation";
import useFetch from "../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
// import useFetch from "../Hooks/useFetch";

const City = () => {
  const { location } = useGeolocation();
  const { locations: cities } = useSelector(
    (state: RootState) => state.locations
  );
  const { data } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${
      location?.latitude
    }&lon=${location?.longitude}&appid=${import.meta.env.VITE_API_KEY}`
  );

  // console.log({ location });
  // console.log(data?.name);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [allLoadedPages, setAllLoadedPages] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${
            currentPage * 20
          }`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(`data:${data}`);
        if (data?.results?.length) {
          dispatch(addLocation(data.results));
          setAllLoadedPages((prev) => [...prev, currentPage]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!allLoadedPages.includes(currentPage)) {
      fetchData();
    }
  }, [currentPage]);

  useEffect(() => {
    if (data) {
      navigate(`/weather/${data?.name}`);
    }
  }, [data]);

  return (
    <div className="w-[100%] min-h-[100vh] md:w-[80%] mx-auto p-3">
      <LocationTable />
      <button
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
        className="bg-slate-200 py-1 px-2 mt-3 rounded-[0.3rem]"
      >
        Load More
      </button>
      <span className="ml-3">Cities: {cities?.length}</span>
    </div>
  );
};

export default City;

import { useEffect, useState } from "react";
import LocationTable from "../Components/Table/LocationTable";
import { useDispatch } from "react-redux";
import { addLocation } from "../redux/locationSlice";
// import useFetch from "../Hooks/useFetch";

const City = () => {
  const dispatch = useDispatch();
  // const [currentPage, setCurrentPage] = useState<number>(0);

  // const { data } = useFetch(
  //   `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${
  //     currentPage * 20
  //   }`
  // );

  // useEffect(() => {
  //   if (data) {

  //     dispatch(addLocation(data?.results));
  //   }
  // }, [data]);
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

  return (
    <div className="w-[80%] mx-auto p-3">
      <button
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        Next
      </button>
      <LocationTable />
    </div>
  );
};

export default City;

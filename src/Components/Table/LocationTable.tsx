import { useTable } from "react-table";
import { COLUMNS } from "./column.js";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.js";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const LocationTable = () => {
  const { locations } = useSelector((state: RootState) => state.locations);
  const navigate = useNavigate();
  const columns = useMemo(() => COLUMNS, []);
  const tableData = useMemo(
    () =>
      locations.map((item) => ({
        ...item,
        coordinates: `${item?.coordinates?.lon} ,${item?.coordinates?.lat}`,
      })),
    [locations]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: tableData,
  });

  const handleCellClick = (value, row) => {
    // console.log("Clicked cell value:", value, "Row data:", row.original);
    // console.log(row.original.name);
    navigate(`/weather/${row.original.name}`);
  };

  return (
    <div className="w-[100%] h-[400px] bg-slate-200  overflow-y-auto text-center">
      <table {...getTableProps()} className="w-full text-slate-800">
        <thead className="bg-slate-300">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="p-3 ">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="hover:bg-slate-300 cursor-pointer"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps({
                        onClick: () => handleCellClick(cell.value, row),
                      })}
                      className="p-3"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LocationTable;

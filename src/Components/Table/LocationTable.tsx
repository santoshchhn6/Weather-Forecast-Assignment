import { useTable } from "react-table";
import { COLUMNS } from "./column.js";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.js";
import { useMemo } from "react";

const LocationTable = () => {
  const { locations } = useSelector((state: RootState) => state.locations);

  console.log(locations);
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

  return (
    <div className="w-[100%] h-[400px] overflow-y-auto text-center">
      <table {...getTableProps()} className="w-full text-slate-800">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="p-3 border border-slate-600 bg-slate-200"
                >
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
                className="hover:bg-slate-200 cursor-pointer"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="p-3 border border-slate-600"
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

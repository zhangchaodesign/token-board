import React, { useMemo } from "react";
import { ModelBox } from "@/components/ModelBox";
import { CategoryBox } from "@/components/CategoryBox";
import { CellBox } from "@/components/CellBox";
import { TotalBox } from "@/components/TotalBox";
import { Data, CellData } from "@/libs/type";

type DataTableProps = {
  data: Data;
};

const DataTable = (props: DataTableProps) => {
  const columns = useMemo(() => {
    return props.data.length > 0 ? Object.keys(props.data[0]) : [];
  }, []);

  return (
    <div className="relative">
      <table>
        <thead className="sticky top-16 z-10">
          <tr>
            <th key="model"></th>
            {
              // skip first two columns
              columns.slice(3).map((column) => (
                <th key={column}>
                  <CategoryBox category={column} />
                </th>
              ))
            }
          </tr>
        </thead>

        <tbody>
          {
            // skip first three columns
            props.data.map((item: CellData, index) => (
              <tr key={index}>
                <th key="model" className="sticky left-6 z-30 flex flex-row">
                  <ModelBox
                    model={item.model.toString()}
                    company={item.company.toString()}
                  />
                  <TotalBox content={item.total.toLocaleString()} />
                </th>
                {columns.slice(3).map((column) => (
                  <td key={`${index}-${column}`}>
                    <CellBox
                      content={
                        typeof item[column] === "number"
                          ? item[column].toLocaleString()
                          : item[column]
                      }
                    />
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="fixed top-0 left-0 bg-gray-50 h-screen w-72 z-20"></div>
      <div className="fixed top-0 left-0 bg-gray-50 h-28 w-72 z-30"></div>
    </div>
  );
};

export default DataTable;

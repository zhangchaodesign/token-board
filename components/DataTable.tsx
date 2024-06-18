import React, { useMemo } from "react";
import { cn } from "@/libs/utils";
import { ModelBox } from "@/components/ModelBox";
import { CategoryBox } from "@/components/CategoryBox";
import { CellBox } from "@/components/CellBox";
import { TotalBox } from "@/components/TotalBox";
import { Data, CellData } from "@/libs/type";

type DataTableProps = {
  classes: string;
  data: Data;
};

export const DataTable = (props: DataTableProps) => {
  const columns = useMemo(() => {
    return props.data.length > 0 ? Object.keys(props.data[0]) : [];
  }, []);

  return (
    <div className={cn(props.classes + "")}>
      <table>
        <thead>
          <tr className="sticky top-40 z-20 bg-gray-50 rounded">
            <th
              key="model"
              className="sticky left-6 top-40 z-30 bg-gray-50 rounded"
            >
              <div className="bg-gray-800 w-[258px] rounded py-2 text-white text-base m-1 flex flex-col items-center justify-center select-none">
                <p className="capitalize text-base">MODEL</p>
              </div>
            </th>
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
                <th
                  key="model"
                  className="sticky left-6 z-10 bg-gray-50 flex flex-row rounded"
                >
                  <ModelBox
                    model={item.model.toString()}
                    company={item.company.toString()}
                  />
                  <TotalBox content={item.total.toLocaleString()} />
                </th>
                {columns.slice(3).map((column) => (
                  <td key={`${index}-${column}`}>
                    <CellBox
                      content={Number(item[column])}
                      total={Number(item.total)}
                    />
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

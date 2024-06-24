import React, { useMemo, useEffect, useRef } from "react";
import { cn } from "@/libs/utils";
import { ModelBox } from "@/components/ModelBox";
import { CategoryBox } from "@/components/CategoryBox";
import { CellBox } from "@/components/homepage/CellBox";
import { TotalBox } from "@/components/TotalBox";
import { Overview, CellData } from "@/libs/type";

type DataTableProps = {
  classes?: string;
  data: Overview;
  highlightCategory: string;
  displayMode: string;
  categorySortingMode: string;
  modelSortingMode: string;
  showPercentage: boolean;
  setModelSortingMode: (mode: string) => void;
  setHighlightCategory: (category: string) => void;
};

export const DataTable = (props: DataTableProps) => {
  const data = useMemo(() => {
    // sort the data by the number of modelSortingMode (category) in each model in descending order
    return props.data.sort((a, b) => {
      if (props.displayMode === "COUNT") {
        return (
          Number(b[props.modelSortingMode as keyof Overview[0]]) -
          Number(a[props.modelSortingMode as keyof Overview[0]])
        );
      } else if (props.displayMode === "PERCENTAGE") {
        return (
          (Number(b[props.modelSortingMode as keyof Overview[0]]) /
            Number(b.total)) *
            100 -
          (Number(a[props.modelSortingMode as keyof Overview[0]]) /
            Number(a.total)) *
            100
        );
      } else {
        return 0;
      }
    });
  }, [props.data, props.modelSortingMode, props.displayMode]);

  const columns = useMemo(() => {
    let columns = data.length > 0 ? Object.keys(data[0]) : [];
    // if categorySortingMode is ALPHABETICAL, sort the columns, except for the first 3 columns
    if (props.categorySortingMode === "ALPHABETICAL ORDER") {
      columns = columns.slice(3).sort();
    }
    // if categorySortingMode is FREQUENCY, sort the columns by total frequency across different models, except for the first 3 columns
    if (
      props.categorySortingMode === "ASCENDING ORDER" ||
      props.categorySortingMode === "DESCENDING ORDER"
    ) {
      // calculate the total frequency of each category
      const totalValue: { [key: string]: number } = {};
      props.data.forEach((item) => {
        columns.slice(3).forEach((column) => {
          if (props.displayMode === "COUNT") {
            totalValue[column] =
              (totalValue[column] || 0) +
              Number(item[column as keyof Overview[0]]);
          } else if (props.displayMode === "PERCENTAGE") {
            totalValue[column] =
              (totalValue[column] || 0) +
              Number(item[column as keyof Overview[0]]) / Number(item.total);
          }
        });
      });

      // sort the columns by total frequency
      columns = columns.slice(3).sort((a, b) => {
        if (props.categorySortingMode === "ASCENDING ORDER") {
          return totalValue[a] - totalValue[b];
        } else {
          return totalValue[b] - totalValue[a];
        }
      });
    }
    // add the first 3 columns back to the beginning
    columns = columns.slice(0, 3).concat(columns);
    return columns;
  }, [props.data, props.categorySortingMode]);

  const headersRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    if (headersRef.current) {
      const element = headersRef.current.querySelector(
        `th[data-category="${props.highlightCategory.toUpperCase()}"]`,
      );
      if (element) {
        //scroll into center
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  }, [props.highlightCategory]);

  return (
    <div className={cn(props.classes + " px-6")}>
      <table>
        <thead ref={headersRef}>
          <tr className="sticky top-0 z-20 bg-gray-50 rounded">
            <th
              key="model"
              className="sticky left-0 top-0 z-30 bg-gray-50 rounded"
            >
              <div className="bg-gray-800 w-[258px] rounded py-2 text-white text-base m-1 flex-col flex-center select-none">
                <p className="capitalize text-base">MODEL</p>
              </div>
            </th>
            {columns.slice(3).map((column) => (
              <th key={column} data-category={column}>
                <CategoryBox
                  category={column}
                  classes={
                    props.highlightCategory.toUpperCase() === column
                      ? "bg-gray-800"
                      : "bg-gray-500" +
                        " transition hover:scale-105 duration-100 hover:shadow-md hover:bg-gray-800 hover:text-white hover:border-none cursor-pointer"
                  }
                  onClick={() => {
                    props.setModelSortingMode(column);
                    props.setHighlightCategory(column);
                  }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item: CellData, index) => (
            <tr key={index}>
              <th
                key="model"
                className="sticky left-0 z-10 bg-gray-50 flex flex-row rounded"
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
                    displayMode={props.displayMode}
                    model={item.model.toString()}
                    category={column}
                    showPercentage={props.showPercentage}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

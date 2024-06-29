import React from "react";
import { TbFilterFilled } from "react-icons/tb";

type FilterSliderProps = {
  filterValue: number;
  setFilterValue: (value: number) => void;
  title?: string;
};

export const FilterSlider = (props: FilterSliderProps) => {
  return (
    <div className="flex flex-row" title={props.title}>
      <div className="flex flex-row items-center gap-2 bg-gray-100 py-2 px-4 rounded relative">
        <TbFilterFilled className="text-gray-800" size={20} />
        <div className="text-base bg-transparent focus:outline-none flex-between flex-row select-none">
          <div className="flex-center flex-row gap-2">
            <p className="text-gray-400 text-nowrap">Filter Tokens</p>
            <input
              type="range"
              min={0}
              max="14"
              value={props.filterValue}
              className="range range-xs w-32"
              onChange={(e) => {
                props.setFilterValue(parseInt(e.target.value));
              }}
            />
          </div>

          <p className="ml-4 w-4">
            {props.filterValue === 0 ? "All" : props.filterValue}
          </p>
        </div>
      </div>
    </div>
  );
};

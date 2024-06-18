import React from "react";
import { cn } from "@/libs/utils";
import { TbSearch } from "react-icons/tb";

type ToolBarProps = {
  classes: string;
};

export const ToolBar = (props: ToolBarProps) => {
  return (
    <div
      className={cn(
        props.classes +
          " bg-gray-50 py-4 z-50 flex flex-row gap-1 items-center h-24"
      )}
    >
      <div className="w-[150px] font-medium text-2xl justify-center text-center uppercase m-1">
        Overview
      </div>
      <div className="flex flex-row">
        {/* search bar with icon*/}

        <div className="flex flex-row items-center gap-2 bg-white p-4 rounded">
          <TbSearch className="text-gray-800" size={20} />
          <input
            className="text-lg w-48 bg-transparent focus:outline-none"
            type="text"
            placeholder="Search category ..."
          />
        </div>
      </div>
    </div>
  );
};

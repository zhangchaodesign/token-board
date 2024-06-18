import React from "react";

type CellBoxProps = {
  content: number;
  total: number;
};

export const CellBox = (props: CellBoxProps) => {
  return (
    <div className="cell-box cursor-pointer select-none transition hover:scale-105 duration-150 hover:shadow-sm border-[0.8px] relative">
      <p className="capitalize text-base z-[5]">{props.content}</p>
      <div
        className="bg-blue-100 h-[64px] rounded absolute left-0"
        style={
          // width is calculated based on the percentage of the content
          { width: `${(props.content / props.total) * 100}%` }
        }
      ></div>
    </div>
  );
};

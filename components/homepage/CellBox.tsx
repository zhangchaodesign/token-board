"use client";

import React, { useState } from "react";

type CellBoxProps = {
  content: number;
  total: number;
  displayMode: string;
};

export const CellBox = (props: CellBoxProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="cell-box"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p className="capitalize text-base z-[5]">
        {props.displayMode === "COUNT"
          ? props.content
          : ((props.content / props.total) * 100).toFixed(4) + "%"}
      </p>
      <div
        className="h-[64px] rounded-l absolute left-0"
        style={
          // width is calculated based on the percentage of the content
          {
            width: `${(props.content / props.total) * 100}%`,
            backgroundColor: hover ? "#2563eb" : "#dbeafe",
          }
        }
      ></div>
    </div>
  );
};

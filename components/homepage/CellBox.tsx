"use client";

import React, { useState } from "react";
import Link from "next/link";

type CellBoxProps = {
  content: number;
  total: number;
  displayMode: string;
  model: string;
  category: string;
  showPercentage: boolean;
};

export const CellBox = (props: CellBoxProps) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/gallery/${props.model.toLowerCase()}/${props.category.toLowerCase()}`}
    >
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

        {props.showPercentage && (
          <p className="absolute text-xs bottom-1 right-1 z-[5]">
            ({((props.content / props.total) * 100).toFixed(2) + "%"})
          </p>
        )}

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
    </Link>
  );
};

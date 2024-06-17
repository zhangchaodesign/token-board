import React from "react";

type CellBoxProps = {
  content: string;
};

export const CellBox = (props: CellBoxProps) => {
  return (
    <div className="cell-box">
      <p className="capitalize text-base">{props.content}</p>
    </div>
  );
};

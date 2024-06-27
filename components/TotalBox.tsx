import React from "react";

type TotalBoxProps = {
  content: string | undefined;
};

export const TotalBox = (props: TotalBoxProps) => {
  return (
    <div className="total-box">
      <p className="capitalize text-base">{props.content}</p>
    </div>
  );
};

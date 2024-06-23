import React from "react";

type ModelBoxProps = {
  company: string;
  model: string;
};

export const ModelBox = (props: ModelBoxProps) => {
  return (
    <div className="row-title-box">
      <p className="capitalize text-base">{props.model.toUpperCase()}</p>
      <hr className="line-dashed"></hr>
      <p className="capitalize text-sm text-gray-300">{props.company}</p>
    </div>
  );
};

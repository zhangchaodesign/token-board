import React from "react";

type CategoryBoxProps = {
  category: string;
};

export const CategoryBox = (props: CategoryBoxProps) => {
  return (
    <div className="col-title-box">
      <p className="capitalize text-base">{props.category.toUpperCase()}</p>
    </div>
  );
};

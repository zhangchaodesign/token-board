import React from "react";
import { cn } from "@/libs/utils";

type CategoryBoxProps = {
  classes?: string;
  category: string;
  onClick?: () => void;
};

export const CategoryBox = (props: CategoryBoxProps) => {
  return (
    <div
      className={cn(props.classes + " col-title-box")}
      onClick={props.onClick}
    >
      <p className="capitalize text-base">
        {props.category.toUpperCase() === "N"
          ? "NUMBER"
          : props.category.toUpperCase() === "P"
            ? "PUNCTUATION"
            : props.category.toUpperCase() === "S"
              ? "SYMBOL"
              : props.category.toUpperCase()}
      </p>
    </div>
  );
};

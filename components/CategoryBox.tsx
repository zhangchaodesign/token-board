import React from "react";
import { cn } from "@/libs/utils";

type CategoryBoxProps = {
  classes?: string;
  category: string;
};

export const CategoryBox = (props: CategoryBoxProps) => {
  return (
    <div className={cn(props.classes + " col-title-box")}>
      <p className="capitalize text-base">{props.category.toUpperCase()}</p>
    </div>
  );
};

import React from "react";
import { cn, expand_abbr } from "@/libs/utils";

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
        {expand_abbr(props.category).toUpperCase()}
      </p>
    </div>
  );
};

"use client";

import React from "react";
import { cn } from "@/libs/utils";

type ToolBarProps = {
  classes: string;
};

export const ToolBar = (props: ToolBarProps) => {
  return (
    <div
      className={cn(
        props.classes + " bg-gray-50 z-50 flex flex-row gap-1 items-center",
      )}
    >
      <div className="w-[150px] font-medium text-2xl flex-center text-center uppercase m-1">
        Gallery
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { cn } from "@/libs/utils";
import { SearchTool } from "@/components/homepage/SearchTool";
import { DropdownTool } from "@/components/homepage/DropdownTool";

type ToolBarProps = {
  classes: string;
  highlightCategory: string;
  setHighlightCategory: (category: string) => void;
  displayMode: string;
  setDisplayMode: (mode: string) => void;
  displayModeList: string[];
  categorySortingMode: string;
  setCategorySortingMode: (mode: string) => void;
  categorySortingModeList: string[];
  modelSortingMode: string;
  setModelSortingMode: (mode: string) => void;
  modelSortingModeList: string[];
};

export const ToolBar = (props: ToolBarProps) => {
  return (
    <div
      className={cn(
        props.classes +
          " bg-gray-50 z-50 flex flex-row gap-1 items-center h-24",
      )}
    >
      <div className="w-[150px] font-medium text-2xl flex-center text-center uppercase m-1">
        Overview
      </div>

      <div className="flex flex-row gap-4">
        <SearchTool
          highlightCategory={props.highlightCategory}
          setHighlightCategory={props.setHighlightCategory}
        />

        <DropdownTool
          type="display"
          list={props.displayModeList}
          value={props.displayMode}
          setValue={props.setDisplayMode}
        />

        <DropdownTool
          type="category_sort"
          list={props.categorySortingModeList}
          value={props.categorySortingMode}
          setValue={props.setCategorySortingMode}
        />

        <DropdownTool
          type="model_sort"
          list={props.modelSortingModeList}
          value={props.modelSortingMode}
          setValue={props.setModelSortingMode}
        />
      </div>
    </div>
  );
};

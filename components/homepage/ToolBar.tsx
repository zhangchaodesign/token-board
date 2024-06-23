"use client";

import React from "react";
import { cn } from "@/libs/utils";
import { SearchBar } from "@/components/SearchBar";
import { DropdownTool } from "@/components/homepage/DropdownTool";
import { CATEGORY } from "@/libs/utils";

type ToolBarProps = {
  classes?: string;
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
        props.classes + " bg-gray-50 z-50 flex flex-row gap-1 items-center"
      )}
    >
      <div className="w-[150px] font-medium text-2xl flex-center text-center uppercase m-1">
        Overview
      </div>

      <div className="flex flex-row gap-4">
        <SearchBar
          inputValue={props.highlightCategory}
          setInputValue={props.setHighlightCategory}
          candidateList={CATEGORY}
          placeholder="Search category ..."
        />

        <DropdownTool
          type="display"
          list={props.displayModeList}
          value={props.displayMode}
          setValue={props.setDisplayMode}
          placeholder="Display by "
        />

        <DropdownTool
          type="sort"
          list={props.categorySortingModeList}
          value={props.categorySortingMode}
          setValue={props.setCategorySortingMode}
          placeholder="Sort Categories by "
        />

        <DropdownTool
          type="sort"
          list={props.modelSortingModeList}
          value={props.modelSortingMode}
          setValue={props.setModelSortingMode}
          placeholder="Sort Models by "
        />
      </div>
    </div>
  );
};

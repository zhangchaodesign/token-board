"use client";

import React from "react";
import { cn } from "@/libs/utils";
import { SearchBar } from "@/components/SearchBar";
import { Dropdown } from "@/components/Dropdown";
import { CATEGORY } from "@/libs/utils";
import { CheckBox } from "@/components/CheckBox";

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
  showPercentage: boolean;
  setShowPercentage: (showPercentage: boolean) => void;
};

export const ToolBar = (props: ToolBarProps) => {
  return (
    <div
      className={cn(
        props.classes +
          " bg-gray-50 flex flex-row gap-4 items-center z-50 px-6",
      )}
    >
      <div className="min-w-[150px] font-medium text-2xl flex-center text-center uppercase m-1">
        Overview
      </div>

      <div className="flex gap-4 flex-wrap items-start justify-start">
        <SearchBar
          inputValue={props.highlightCategory}
          setInputValue={props.setHighlightCategory}
          candidateList={CATEGORY}
          placeholder="Search category ..."
          caseInsensitive={true}
        />
        {/* 
        <Dropdown
          type="display"
          list={props.displayModeList}
          value={props.displayMode}
          setValue={props.setDisplayMode}
          placeholder="Display by "
          enableSearch={false}
        /> */}

        <CheckBox
          checked={props.showPercentage}
          setChecked={props.setShowPercentage}
          text="Show Percentage"
        />

        <Dropdown
          type="sort"
          list={props.categorySortingModeList}
          value={props.categorySortingMode}
          setValue={props.setCategorySortingMode}
          placeholder="Sort Categories by # Tokens in "
          enableSearch={false}
        />

        <Dropdown
          type="sort"
          list={props.modelSortingModeList}
          value={props.modelSortingMode}
          setValue={props.setModelSortingMode}
          placeholder="Sort Models by # Tokens in "
          enableSearch={true}
        />
      </div>
    </div>
  );
};

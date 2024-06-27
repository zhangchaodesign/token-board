import React from "react";
import { cn } from "@/libs/utils";
// import { Dropdown } from "@/components/Dropdown";
// import { SearchBar } from "@/components/SearchBar";
// import { CheckBox } from "@/components/CheckBox";
// import { FilterSlider } from "@/components/gallery/FilterSlider";

type ToolBarProps = {
  classes?: string;
  // searchToken: string;
  // setSearchToken: (token: string) => void;
  // searchMode: string;
  // setSearchMode: (mode: string) => void;
  // ifShader: boolean;
  // setIfShader: (ifShader: boolean) => void;
  // tokenSortingMode: string;
  // setTokenSortingMode: (mode: string) => void;
  // tokenSortingModeList: string[];
  // filterValue: number;
  // setFilterValue: (value: number) => void;
};

export const ToolBar = (props: ToolBarProps) => {
  return (
    <div
      className={cn(
        props.classes +
          " bg-gray-50 flex flex-row gap-4 z-50 items-center px-6",
      )}
    >
      <div className="min-w-[150px] font-medium text-2xl flex-center text-center uppercase m-1">
        Token
      </div>
      {/* <div className="flex gap-4 flex-wrap items-start justify-start">
        <SearchBar
          inputValue={props.searchToken}
          setInputValue={props.setSearchToken}
          placeholder={
            props.searchMode === "containing"
              ? "Search tokens containing ..."
              : "Search tokens contained in ..."
          }
          classes="w-72"
          addOn={() => {
            if (props.searchMode === "containing") {
              props.setSearchMode("contained");
            } else {
              props.setSearchMode("containing");
            }
          }}
          caseInsensitive={false}
        />

        <CheckBox
          checked={props.ifShader}
          setChecked={props.setIfShader}
          text="Shade Tokens by Cross-Model Frequency"
        />

        <Dropdown
          type="sort"
          list={props.tokenSortingModeList}
          value={props.tokenSortingMode}
          setValue={props.setTokenSortingMode}
          placeholder="Sort Tokens by "
        />

        <FilterSlider
          filterValue={props.filterValue}
          setFilterValue={props.setFilterValue}
        />
      </div> */}
    </div>
  );
};

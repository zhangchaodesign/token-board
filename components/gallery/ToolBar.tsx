import React from "react";
import { cn } from "@/libs/utils";
import { TbSquare, TbSquareCheckFilled } from "react-icons/tb";
import { SearchBar } from "@/components/SearchBar";

type ToolBarProps = {
  classes?: string;
  searchToken: string;
  setSearchToken: (token: string) => void;
  searchMode: string;
  setSearchMode: (mode: string) => void;
  ifShader: boolean;
  setIfShader: (ifShader: boolean) => void;
};

export const ToolBar = (props: ToolBarProps) => {
  return (
    <div
      className={cn(
        props.classes + " bg-gray-50 z-50 flex flex-row gap-1 items-center"
      )}
    >
      <div className="w-[150px] font-medium text-2xl flex-center text-center uppercase m-1">
        Gallery
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex-center flex-row gap-2">
          <SearchBar
            inputValue={props.searchToken}
            setInputValue={props.setSearchToken}
            placeholder={
              props.searchMode === "containing"
                ? "Search tokens containing ..."
                : "Search tokens contained in ..."
            }
            classes="w-80"
            addOn={() => {
              if (props.searchMode === "containing") {
                props.setSearchMode("contained");
              } else {
                props.setSearchMode("containing");
              }
            }}
          />
        </div>

        <div>
          <div className="flex flex-row">
            <div className="flex flex-row items-center gap-2 bg-gray-100 py-2 px-4 rounded relative">
              <div
                onClick={() => {
                  props.setIfShader(!props.ifShader);
                }}
              >
                {
                  // check box
                  props.ifShader ? (
                    <TbSquareCheckFilled
                      className="text-gray-800 cursor-pointer"
                      size={20}
                    />
                  ) : (
                    <TbSquare
                      className="text-gray-800 cursor-pointer"
                      size={20}
                    />
                  )
                }
              </div>

              <div className="text-lg bg-transparent focus:outline-none flex-center flex-row select-none">
                <p className="text-gray-400 mr-2">Shade Tokens by</p>
                <p className="underline">Frequency Across Models</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

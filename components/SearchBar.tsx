"use client";

import React, { useState } from "react";
import { cn } from "@/libs/utils";
import { TbSearch, TbSwitch3 } from "react-icons/tb";

type SearchBarProps = {
  classes?: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  candidateList?: string[];
  placeholder: string;
  onSelect?: (value: string) => void;
  addOn?: () => void;
  small?: boolean;
  caseInsensitive: boolean;
};

export const SearchBar = (props: SearchBarProps) => {
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    props.setInputValue(value);
    if (value) {
      if (!props.candidateList) return;
      const filtered = props.candidateList.filter((candidate) => {
        if (props.caseInsensitive)
          return candidate.toLowerCase().includes(value.toLowerCase());
        return candidate.includes(value);
      });
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([]);
    }
  };

  const handleCategorySelect = (value: string) => {
    props.setInputValue(value);
    setFilteredCategories([]);
    if (props.onSelect) props.onSelect(value);
  };

  return (
    <div className={cn(props.classes + " flex flex-row")}>
      <div
        className={
          "flex flex-row items-center gap-2 bg-white py-2 rounded relative border w-full " +
          (props.small ? "px-2" : "px-4")
        }
      >
        {!props.small ? <TbSearch className="text-gray-800" size={20} /> : null}

        <input
          className="text-base w-full bg-transparent focus:outline-none min-w-36"
          type="text"
          placeholder={props.placeholder}
          value={
            props.caseInsensitive
              ? props.inputValue.toUpperCase()
              : props.inputValue
          }
          onChange={handleInputChange}
        />
        {props.addOn && (
          <TbSwitch3
            size={20}
            className="text-gray-800 hover:text-gray-800 cursor-pointer"
            onClick={props.addOn}
          />
        )}
        {filteredCategories.length > 0 && (
          <ul className="absolute left-0 top-12 w-full bg-white shadow-lg rounded mt-1 p-4 max-h-60 overflow-auto">
            {filteredCategories.map(
              (category) =>
                category.toUpperCase() !== "UNKNOWN" && (
                  <li
                    key={category}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category.toUpperCase() === "N"
                      ? "NUMBER"
                      : category.toUpperCase() === "P"
                        ? "PUNCTUATION"
                        : category.toUpperCase() === "S"
                          ? "SYMBOL"
                          : category.toUpperCase()}
                  </li>
                ),
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

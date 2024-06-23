"use client";

import React, { useState } from "react";
import { cn } from "@/libs/utils";
import { TbSearch } from "react-icons/tb";

type SearchBarProps = {
  classes?: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  candidateList: string[];
  placeholder: string;
  onSelect?: (value: string) => void;
};

export const SearchBar = (props: SearchBarProps) => {
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    props.setInputValue(value);
    if (value) {
      const filtered = props.candidateList.filter((candidate) =>
        candidate.toLowerCase().includes(value.toLowerCase())
      );
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
      <div className="flex flex-row items-center gap-2 bg-white py-2 px-4 rounded relative border">
        <TbSearch className="text-gray-800" size={20} />
        <input
          className="text-lg w-full bg-transparent focus:outline-none"
          type="text"
          placeholder={props.placeholder}
          value={props.inputValue.toUpperCase()}
          onChange={handleInputChange}
        />
        {filteredCategories.length > 0 && (
          <ul className="absolute left-0 top-12 w-full bg-white shadow-lg rounded mt-1 p-4 max-h-60 overflow-auto">
            {filteredCategories.map((category) => (
              <li
                key={category}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleCategorySelect(category)}
              >
                {category.toUpperCase()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

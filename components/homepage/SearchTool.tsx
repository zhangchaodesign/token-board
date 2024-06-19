"use client";

import React, { useState } from "react";
import { TbSearch } from "react-icons/tb";
import { CATEGORY } from "@/libs/utils";

type SearchToolProps = {
  highlightCategory: string;
  setHighlightCategory: (category: string) => void;
};

export const SearchTool = (props: SearchToolProps) => {
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    props.setHighlightCategory(value);
    if (value) {
      const filtered = CATEGORY.filter((category) =>
        category.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([]);
    }
  };

  const handleCategorySelect = (category: string) => {
    props.setHighlightCategory(category);
    setFilteredCategories([]);
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center gap-2 bg-white py-2 px-4 rounded relative border">
        <TbSearch className="text-gray-800" size={20} />
        <input
          className="text-lg w-48 bg-transparent focus:outline-none"
          type="text"
          placeholder="Search category ..."
          value={props.highlightCategory}
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
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

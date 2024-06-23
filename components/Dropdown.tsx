import React, { useState } from "react";
import {
  TbContrast2Filled,
  TbCaretDownFilled,
  TbArrowsSort,
} from "react-icons/tb";

type DropdownProps = {
  type: string;
  list: string[];
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  enableSearch?: boolean;
};

export const Dropdown = (props: DropdownProps) => {
  const [modeSelectActive, setModeSelectActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter list based on search term
  const filteredList = props.list.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center gap-2 bg-gray-100 py-2 px-4 rounded relative">
        {props.type === "display" ? (
          <TbContrast2Filled className="text-gray-800" size={20} />
        ) : (
          <TbArrowsSort className="text-gray-800" size={20} />
        )}
        <div className="text-lg bg-transparent focus:outline-none flex-center flex-row select-none">
          <p className="text-gray-400 mr-2 text-nowrap">{props.placeholder}</p>
          <p className="underline text-nowrap">{props.value}</p>
        </div>
        <TbCaretDownFilled
          className="text-gray-800 cursor-pointer"
          size={20}
          onClick={() => setModeSelectActive(!modeSelectActive)}
        />
        {modeSelectActive && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded mt-1 p-4 max-h-60 overflow-auto select-none">
            {props.enableSearch && (
              <input
                type="text"
                className="p-2 w-full bg-gray-50 focus:outline-gray-200"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}

            <ul>
              {filteredList.map((item) => (
                <li
                  key={item}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    props.setValue(item);
                    setModeSelectActive(false);
                    setSearchTerm("");
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

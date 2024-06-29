import React from "react";
import { TbSquare, TbSquareCheckFilled } from "react-icons/tb";

type CheckBoxProps = {
  checked: boolean;
  setChecked: (value: boolean) => void;
  text: string;
  title?: string;
};

export const CheckBox = (props: CheckBoxProps) => {
  return (
    <div className="flex flex-row" title={props.title}>
      <div className="flex flex-row items-center gap-2 bg-gray-100 py-2 px-4 rounded relative">
        <div
          onClick={() => {
            props.setChecked(!props.checked);
          }}
        >
          {
            // check box
            props.checked ? (
              <TbSquareCheckFilled
                className="text-gray-800 cursor-pointer"
                size={20}
              />
            ) : (
              <TbSquare className="text-gray-800 cursor-pointer" size={20} />
            )
          }
        </div>

        <div className="text-base bg-transparent focus:outline-none flex-center flex-row select-none">
          <p className="text-nowrap">{props.text}</p>
        </div>
      </div>
    </div>
  );
};

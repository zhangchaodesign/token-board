import React from "react";
import { TbSquare, TbSquareCheckFilled } from "react-icons/tb";

type ShaderControllerProps = {
  ifShader: boolean;
  setIfShader: (value: boolean) => void;
};

export const ShaderController = (props: ShaderControllerProps) => {
  return (
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
              <TbSquare className="text-gray-800 cursor-pointer" size={20} />
            )
          }
        </div>

        <div className="text-lg bg-transparent focus:outline-none flex-center flex-row select-none">
          <p className="text-gray-400 mr-2 text-nowrap">Shade Tokens by</p>
          <p className="underline text-nowrap">Frequency Across Models</p>
        </div>
      </div>
    </div>
  );
};

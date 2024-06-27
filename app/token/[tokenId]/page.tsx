import React from "react";
import { ToolBar } from "@/components/token/ToolBar";
import { BackBtn } from "@/components/BackBtn";

type TokenProps = {
  params: {
    tokenId: number;
  };
};

export default function Token(props: TokenProps) {
  return (
    <div className="grid-container">
      <ToolBar classes="flex-none p-4 w-full" />
      <div className="grow flex flex-row justify-start items-start gap-6 px-6 bg-gray-50 overflow-y-auto relative">
        <div>{props.params.tokenId}</div>
      </div>

      <BackBtn />
    </div>
  );
}

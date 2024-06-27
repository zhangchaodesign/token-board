import React from "react";
import { cn } from "@/libs/utils";
import { Token } from "@/libs/type";
import { TokenBox } from "../TokenBox";

import Link from "next/link";

type TokenGalleryProps = {
  classes?: string;
  tokens: Token[];
  ifShader: boolean;
  category: string;
};

export const TokenGallery = (props: TokenGalleryProps) => {
  return (
    <div
      className={cn(
        props.classes +
          " flex flex-wrap gap-2 items-start justify-start pb-4 pt-1 bg-gray-50",
      )}
    >
      {props.tokens.map((token, index) => (
        <TokenBox
          key={index}
          token={token}
          ifShader={props.ifShader}
          category={props.category}
        />
      ))}
    </div>
  );
};

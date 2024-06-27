import React from "react";
import { cn } from "@/libs/utils";
import { Token } from "@/libs/type";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";

type TokenGalleryProps = {
  classes?: string;
  tokens: Token[];
  ifShader: boolean;
};

const noto_sans = Noto_Sans({ preload: false });

export const TokenGallery = (props: TokenGalleryProps) => {
  const _calc_color = (count: number) => {
    // 1-2: bg-blue-50, 3-4: bg-blue-100, 5-6: bg-blue-200, 7-8: bg-blue-300, 9-10: bg-blue-400, 11-12: bg-blue-500, 13-14: bg-blue-600, >15: bg-blue-700
    const color = [
      "bg-blue-100 text-gray-800",
      "bg-blue-200 text-gray-800",
      "bg-blue-300 text-gray-800",
      "bg-blue-400 text-gray-800",
      "bg-blue-500 text-white",
      "bg-blue-600 text-white",
      "bg-blue-700 text-white",
      "bg-blue-800 text-white",
    ];

    if (props.ifShader) {
      return color[Math.min(Math.floor((count - 1) / 2), 7)];
    } else {
      return "bg-blue-50 text-gray-800";
    }
  };

  return (
    <div
      className={cn(
        props.classes +
          " flex flex-wrap gap-2 items-start justify-start pb-4 pt-1 bg-gray-50",
      )}
    >
      {props.tokens.map((token, index) => (
        <Link href={`/token/${token.token_idx}`}>
          <div
            key={index}
            className={
              noto_sans.className + " token-box " + _calc_color(token.count)
            }
            // add tooltip to show the content
            title={token.count.toString()}
          >
            {token.token}{" "}
          </div>
        </Link>
      ))}
    </div>
  );
};

import React from "react";
import { cn } from "@/libs/utils";
import { Noto_Sans } from "next/font/google";
import { Token } from "@/libs/type";
import Link from "next/link";

type TokenBoxProps = {
  classes?: string;
  ifShader: boolean;
  token: Token;
  category: string;
};

const noto_sans = Noto_Sans({ preload: false });

export const TokenBox = (props: TokenBoxProps) => {
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
    <Link
      href={`/report/${props.category}/${props.token.token_idx}/${encodeURIComponent(props.token.token)}`}
      className={
        cn(props.classes) +
        " token-box flex-center " +
        _calc_color(props.token.count)
      }
      title={props.token.count.toString()}
    >
      <p className={noto_sans.className + " text-nowrap text-center"}>
        {props.token.token}
      </p>
    </Link>
  );
};

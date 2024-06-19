"use client";

import React, { useState, useEffect } from "react";
import { ModelBox } from "@/components/homepage/ModelBox";
import { CategoryBox } from "@/components/homepage/CategoryBox";
import { ToolBar } from "@/components/gallery/ToolBar";
import { MODEL_DICT } from "@/libs/utils";
import { Noto_Sans } from "next/font/google";
import { Token } from "@/libs/type";

type GalleryProps = {
  params: {
    model: string;
    category: string;
  };
};

// all subsets of the Noto Sans font
const noto_sans = Noto_Sans({ preload: false });

export default function Gallery(props: GalleryProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const company =
    MODEL_DICT[
      MODEL_DICT.findIndex((item) => item.model === props.params.model)
    ].company;

  useEffect(() => {
    const fetchTokens = async () => {
      const response = await fetch(
        `/data/model_tokens/${props.params.model}.tsv`
      );
      const text = await response.text();
      const lines = text.split("\n");
      const tokensData = lines
        .slice(1)
        .map((line) => {
          const [model_name, token_idx, token, token_category] =
            line.split("\t");
          return {
            model_name,
            token_idx: Number(token_idx),
            token,
            token_category
          };
        })
        .filter((token) => token.token_category === props.params.category);
      setTokens(tokensData);
    };

    fetchTokens();
  }, [props.params.model, props.params.category]);

  return (
    <div>
      <ToolBar classes="fixed top-16 left-0 p-4 w-full" />
      <div className="absolute top-40 px-6 pb-4 flex flex-row justify-center">
        <div className="flex flex-col items-center gap-1">
          <ModelBox model={props.params.model} company={company} />
          <CategoryBox classes="bg-gray-500" category={props.params.category} />
        </div>

        <div
          className={`flex flex-wrap gap-2 ${noto_sans.className}`}
          style={{ alignItems: "flex-start" }}
        >
          {tokens.map((token, index) => (
            <div
              key={index}
              style={{
                height: "30px",
                background: "lightgray",
                padding: "5px"
              }}
            >
              {token.token}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

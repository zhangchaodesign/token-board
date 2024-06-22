"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ModelBox } from "@/components/homepage/ModelBox";
import { CategoryBox } from "@/components/homepage/CategoryBox";
import { ToolBar } from "@/components/gallery/ToolBar";
import { MODEL_DICT } from "@/libs/utils";
import { Noto_Sans } from "next/font/google";
import { Token } from "@/libs/type";
import { TbArrowBackUp } from "react-icons/tb";

type GalleryProps = {
  params: {
    model: string;
    category: string;
  };
};

const noto_sans = Noto_Sans({ preload: false });

export default function Gallery(props: GalleryProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const company =
    MODEL_DICT[
      MODEL_DICT.findIndex((item) => item.model === props.params.model)
    ].company;

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      const tokenDataModule = await import(
        `@/data/tokens/${props.params.model.toLowerCase()}.js`
      );
      const tokensData = tokenDataModule.default.filter(
        (token: Token) => token.token_category === props.params.category,
      );
      setTokens(tokensData);
      setIsLoading(false);
    };

    fetchTokens();
  }, [props.params.model, props.params.category]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <ToolBar classes="fixed top-16 left-0 p-4 w-full h-[12vh]" />
      <div className="absolute top-40 px-6 flex flex-row justify-center gap-6">
        <div className="flex-between flex-col pb-4">
          <div className="flex flex-col items-center gap-1">
            <ModelBox model={props.params.model} company={company} />
            <CategoryBox
              classes="bg-gray-500"
              category={props.params.category}
            />
          </div>

          <Link href={`/`} className="btn m-1 flex-center gap-4">
            <TbArrowBackUp size={20} className="text-white" />
            <button>BACK</button>
          </Link>
        </div>

        <div
          className="flex flex-wrap gap-2 overflow-y-auto items-start h-[80vh] pb-4"
          id="gallery"
        >
          {tokens.map((token, index) => (
            <div key={index} className={noto_sans.className + " token-box"}>
              {token.token}: {token.count}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

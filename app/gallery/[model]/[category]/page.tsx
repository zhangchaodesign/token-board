"use client";

import React, { useState, useEffect } from "react";
import { ToolBar } from "@/components/gallery/ToolBar";
import { Token } from "@/libs/type";
import { TokenGallery } from "@/components/gallery/TokenGallery";
import { SideBar } from "@/components/gallery/SideBar";

type GalleryProps = {
  params: {
    model: string;
    category: string;
  };
};

export default function Gallery(props: GalleryProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      const tokenDataModule = await import(
        `@/data/tokens/${props.params.model.toLowerCase()}.js`
      );
      const tokensData = tokenDataModule.default.filter(
        (token: Token) =>
          token.token_category?.toLowerCase() === props.params.category
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
      <div className="absolute top-40 flex flex-row justify-start items-start gap-6 px-6">
        <SideBar
          classes="h-[80vh]"
          model={props.params.model}
          category={props.params.category}
        />
        <TokenGallery classes="max-h-[80vh]" tokens={tokens} />
      </div>
    </div>
  );
}

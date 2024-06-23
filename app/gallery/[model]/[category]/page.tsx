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
  const [searchToken, setSearchToken] = useState<string>("");
  const [searchMode, setSearchMode] = useState<string>("containing"); // containing, contained
  const [ifShader, setIfShader] = useState<boolean>(true);
  const [tokenSortingMode, setTokenSortingMode] = useState<string>("ID"); // id, frequency
  const tokenSortingModeList = ["ID", "FREQUENCY"];
  const [filterValue, setFilterValue] = useState<number>(0);

  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      const tokenDataModule = await import(
        `@/data/tokens/${props.params.model.toLowerCase()}.js`
      );
      const tokensData = tokenDataModule.default.filter((token: Token) => {
        let isEligible = false;
        if (token.token_category?.toLowerCase() === props.params.category) {
          if (searchToken === "") {
            isEligible = true;
          } else {
            if (searchMode === "containing") {
              isEligible = token.token
                .toLowerCase()
                .includes(searchToken.toLowerCase());
            } else if (searchMode === "contained") {
              isEligible = searchToken
                .toLowerCase()
                .includes(token.token.toLowerCase());
            }
          }
        }

        // filter the tokens by filterValue
        if (filterValue > 0) {
          isEligible = isEligible && token.count >= filterValue;
        }

        return isEligible;
      });

      // sort the tokens by tokenSortingMode
      if (tokenSortingMode === "ID") {
        tokensData.sort((a: Token, b: Token) => a.token_idx - b.token_idx);
      } else if (tokenSortingMode === "FREQUENCY") {
        tokensData.sort((a: Token, b: Token) => b.count - a.count);
      }

      setTokens(tokensData);
      setIsLoading(false);
    };

    fetchTokens();
  }, [
    props.params.model,
    props.params.category,
    searchToken,
    searchMode,
    tokenSortingMode,
    filterValue,
  ]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <ToolBar
        classes="fixed top-16 left-0 p-4 w-full h-[12vh]"
        searchToken={searchToken}
        setSearchToken={setSearchToken}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        ifShader={ifShader}
        setIfShader={setIfShader}
        tokenSortingMode={tokenSortingMode}
        setTokenSortingMode={setTokenSortingMode}
        tokenSortingModeList={tokenSortingModeList}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      <div className="absolute top-40 flex flex-row justify-start items-start gap-6 px-6 bg-gray-50">
        <SideBar
          classes="h-[80vh]"
          model={props.params.model}
          category={props.params.category}
        />
        <TokenGallery
          classes="max-h-[80vh]"
          tokens={tokens}
          ifShader={ifShader}
        />
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ToolBar } from "@/components/gallery/ToolBar";
import { Token } from "@/libs/type";
import { TokenGallery } from "@/components/gallery/TokenGallery";
import { SideBar } from "@/components/gallery/SideBar";
import { BackBtn } from "@/components/BackBtn";

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

  const [displayedTokens, setDisplayedTokens] = useState<Token[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const tokensPerPage = 1000;

  const loadMoreTokens = useCallback(() => {
    const nextPage = currentPage + 1;
    const nextTokens = tokens.slice(0, (nextPage + 1) * tokensPerPage);
    setDisplayedTokens(nextTokens);
    setCurrentPage(nextPage);
  }, [currentPage, tokens]);

  useEffect(() => {
    setDisplayedTokens(tokens.slice(0, tokensPerPage));
  }, [tokens]);

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);

      // check if window is defined
      if (typeof window !== "undefined") {
        const tokenDataModule = await import(
          `@/data/tokens/${props.params.model.toLowerCase()}.js`
        );
        const data = tokenDataModule.default.filter((token: Token) => {
          let isEligible = false;
          if (token.token_category?.toLowerCase() === props.params.category) {
            if (searchToken === "") {
              isEligible = true;
            } else {
              if (searchMode === "containing") {
                isEligible = token.token.includes(searchToken);
              } else if (searchMode === "contained") {
                isEligible = searchToken.includes(token.token);
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
          data.sort((a: Token, b: Token) => a.token_idx - b.token_idx);
        } else if (tokenSortingMode === "FREQUENCY") {
          data.sort((a: Token, b: Token) => b.count - a.count);
        }

        setTokens(data);
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [
    props.params.model,
    props.params.category,
    searchToken,
    searchMode,
    tokenSortingMode,
    filterValue
  ]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <ToolBar
        classes="flex-none p-4 w-full"
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
      <div className="grow flex flex-row justify-start items-start gap-6 px-6 bg-gray-50 overflow-y-auto relative">
        <SideBar
          classes="fixed"
          model={props.params.model}
          category={props.params.category}
        />
        <TokenGallery
          classes="pl-44"
          category={props.params.category}
          tokens={displayedTokens}
          ifShader={ifShader}
          loadMoreTokens={loadMoreTokens}
        />
      </div>

      <BackBtn />
    </div>
  );
}

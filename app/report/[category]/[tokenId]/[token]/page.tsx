"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ToolBar } from "@/components/report/ToolBar";
import { BackBtn } from "@/components/BackBtn";
import { ModelBox } from "@/components/ModelBox";
import { TotalBox } from "@/components/TotalBox";
import { TokenBox } from "@/components/TokenBox";
import { MODEL_DICT } from "@/libs/utils";
import { Token } from "@/libs/type";

type ReportProps = {
  params: {
    category: string;
    tokenId: number;
    token: string;
  };
};

export default function Report(props: ReportProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchToken, setSearchToken] = useState<string>("");
  const [ifShader, setIfShader] = useState<boolean>(true);
  const [tokenSortingMode, setTokenSortingMode] = useState<string>("FREQUENCY"); // id, frequency
  const tokenSortingModeList = ["ID", "FREQUENCY"];
  const [filterValue, setFilterValue] = useState<number>(0);

  // map MODEL_DICT to create a default data object to store the token data using useState
  type tokenData = {
    company: string;
    model: string;
    tokens: Token[];
  };

  const [orginalTokenList, setOrginalTokenList] = useState<tokenData[]>();
  const [displayedTokenList, setDisplayedTokenList] = useState<tokenData[]>();

  useMemo(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      let data = [];
      let baseToken = decodeURIComponent(props.params.token);

      // check if window is defined
      if (typeof window !== "undefined") {
        for (let i = 0; i < MODEL_DICT.length; i++) {
          // dynamically import the token data based on the model
          const tokenDataModule = await import(
            `@/data/tokens/${MODEL_DICT[i].model.toLowerCase()}.js`
          );

          // filter the token data based on the category and baseToken
          const tokensData = tokenDataModule.default.filter((token: Token) => {
            let isEligible = false;
            if (token.token_category?.toLowerCase() === props.params.category) {
              if (token.token) isEligible = token.token.includes(baseToken);
            }
            return isEligible;
          });

          // add the token data to the data object
          data.push({
            company: MODEL_DICT[i].company,
            model: MODEL_DICT[i].model,
            tokens: tokensData,
          });
        }
      }

      setOrginalTokenList(data);
      setDisplayedTokenList(data);
      setIsLoading(false);
    };

    fetchTokens();
  }, [props.params.token, props.params.category]);

  useEffect(() => {
    if (isLoading || orginalTokenList === undefined) {
      return;
    }

    // filter tokensData by token.token.includes(searchToken);
    let data: tokenData[] = [];

    data = orginalTokenList.map((item) => {
      let tokensData = item.tokens.filter((token) => {
        let isEligible = false;
        isEligible = token.token.includes(searchToken);
        // filter the tokens by filterValue
        if (filterValue > 0) {
          isEligible = isEligible && token.count >= filterValue;
        }

        return isEligible;
      });

      // sort the tokens by tokenSortingMode
      if (tokenSortingMode === "ID") {
        console.log("sorting by ID");
        tokensData.sort((a: Token, b: Token) => a.token_idx - b.token_idx);
      } else if (tokenSortingMode === "FREQUENCY") {
        console.log("sorting by frequency");
        tokensData.sort((a: Token, b: Token) => b.count - a.count);
      }

      return {
        company: item.company,
        model: item.model,
        tokens: tokensData,
      };
    });

    data.sort((a, b) => b.tokens.length - a.tokens.length);

    setDisplayedTokenList(data);
  }, [orginalTokenList, searchToken, tokenSortingMode, filterValue, isLoading]);

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
        baseToken={decodeURIComponent(props.params.token)}
        ifShader={ifShader}
        setIfShader={setIfShader}
        tokenSortingMode={tokenSortingMode}
        setTokenSortingMode={setTokenSortingMode}
        tokenSortingModeList={tokenSortingModeList}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />

      <div className="grow flex flex-row justify-start items-start gap-6 px-6 bg-gray-50 overflow-y-auto relative">
        <div className="flex flex-col pb-24">
          {displayedTokenList &&
            displayedTokenList.map((item) => {
              return (
                <div key={item.model} className="flex flex-row">
                  <div
                    className="flex flex-row sticky left-0 z-10 bg-gray-50  rounded"
                    id="row-title"
                  >
                    <ModelBox company={item.company} model={item.model} />
                    <TotalBox content={item.tokens.length.toString()} />
                  </div>

                  <div className="flex flex-row" id="row-data">
                    {item.tokens.map((token, index) => {
                      return (
                        <TokenBox
                          key={index}
                          token={token}
                          ifShader={ifShader}
                          classes="m-1"
                          category={props.params.category}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <BackBtn />
    </div>
  );
}

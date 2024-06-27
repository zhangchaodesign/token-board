"use client";

import React, { useMemo, useState } from "react";
import { ToolBar } from "@/components/token/ToolBar";
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

  // map MODEL_DICT to create a default data object to store the token data using useState
  type tokenData = {
    company: string;
    model: string;
    tokens: Token[];
  };
  const [tokensData, setTokensData] = useState<tokenData[]>();

  useMemo(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      let data: tokenData[] = [];
      let searchToken = decodeURIComponent(props.params.token);

      // map MODEL_DICT
      for (let i = 0; i < MODEL_DICT.length; i++) {
        // import data based on model name, reverse UTF-8 encoding

        const tokenDataModule = await import(
          `@/data/tokens/${MODEL_DICT[i].model.toLowerCase()}.js`
        );

        // filter the tokens by token and token category
        const tokensData = tokenDataModule.default.filter((token: Token) => {
          let isEligible = false;
          if (token.token_category?.toLowerCase() === props.params.category) {
            if (token.token) isEligible = token.token.includes(searchToken);
          }

          return isEligible;
        });

        // set the tokens to the data object
        data.push({
          company: MODEL_DICT[i].company,
          model: MODEL_DICT[i].model,
          tokens: tokensData,
        });
      }

      setTokensData(data);
      setIsLoading(false);
    };

    fetchTokens();
  }, [props.params.token, props.params.tokenId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <ToolBar classes="flex-none p-4 w-full" />
      <div className="grow flex flex-row justify-start items-start gap-6 px-6 bg-gray-50 overflow-y-auto relative">
        <div className="flex flex-col gap-2 pb-24">
          {tokensData &&
            tokensData.map((item) => {
              return (
                <div className="flex flex-row gap-2">
                  <div
                    className="flex flex-row gap-2 sticky left-0 z-10 bg-gray-50  rounded"
                    id="row-title"
                  >
                    <ModelBox
                      key={item.model}
                      company={item.company}
                      model={item.model}
                    />
                    <TotalBox content={item.tokens.length.toString()} />
                  </div>

                  <div className="flex flex-row gap-1" id="row-data">
                    {item.tokens.map((token, index) => {
                      return (
                        <TokenBox
                          key={index}
                          token={token}
                          ifShader={false}
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

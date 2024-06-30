import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/libs/utils";
import { Token } from "@/libs/type";
import { TokenBox } from "../TokenBox";

type TokenGalleryProps = {
  classes?: string;
  tokens: Token[];
  ifShader: boolean;
  category: string;
  loadMoreTokens: () => void; // 新增加载更多tokens的函数
};

export const TokenGallery = (props: TokenGalleryProps) => {
  const [displayedTokens, setDisplayedTokens] = useState<Token[]>([]);
  const tokensPerPage = 100;
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDisplayedTokens(props.tokens.slice(0, tokensPerPage));
  }, [props.tokens]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        props.loadMoreTokens();
      }
    });

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [props.loadMoreTokens]);

  useEffect(() => {
    setDisplayedTokens(props.tokens);
  }, [props.tokens]);

  return (
    <div className="w-full">
      <div
        className={cn(
          props.classes +
            " flex flex-wrap gap-2 items-start justify-start pb-4 pt-1 bg-gray-50",
        )}
      >
        {displayedTokens.map((token, index) => (
          <TokenBox
            key={index}
            token={token}
            ifShader={props.ifShader}
            category={props.category}
          />
        ))}
      </div>

      <div ref={loadMoreRef} className="flex justify-center my-4">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    </div>
  );
};

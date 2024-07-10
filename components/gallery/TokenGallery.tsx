import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/libs/utils";
import { Token } from "@/libs/type";
import { TokenBox } from "@/components/TokenBox";

type TokenGalleryProps = {
  classes?: string;
  tokens: Token[];
  ifShader: boolean;
  category: string;
  loadMoreTokens: () => void;
};

export const TokenGallery = ({
  classes,
  tokens,
  ifShader,
  category,
  loadMoreTokens
}: TokenGalleryProps) => {
  const [displayedTokens, setDisplayedTokens] = useState<Token[]>([]);
  const tokensPerPage = 100;
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDisplayedTokens(tokens.slice(0, tokensPerPage));
  }, [tokens]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreTokens();
      }
    });

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loadMoreTokens]);

  useEffect(() => {
    setDisplayedTokens(tokens);
  }, [tokens]);

  return (
    <div>
      <div
        className={cn(
          classes +
            " flex flex-wrap gap-2 items-start justify-start pb-4 pt-1 bg-gray-50"
        )}
      >
        {displayedTokens.map((token, index) => (
          <TokenBox
            key={index}
            token={token}
            ifShader={ifShader}
            category={category}
          />
        ))}
      </div>

      <div ref={loadMoreRef} className="flex justify-center my-4">
        {/* <span className="loading loading-spinner loading-sm"></span> */}
      </div>
    </div>
  );
};

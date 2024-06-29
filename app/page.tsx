"use client";

import { useState } from "react";
import { DataTable } from "@/components/homepage/DataTable";
import { ToolBar } from "@/components/homepage/ToolBar";
import OVERVIEW from "@/data/overview";
import { CATEGORY } from "@/libs/utils";

export default function Home() {
  const [highlightCategory, setHighlightCategory] = useState<string>("");
  const [displayMode, setDisplayMode] = useState<string>("COUNT");
  const displayModeList: string[] = ["COUNT", "PERCENTAGE"];
  const [categorySortingMode, setCategorySortingMode] =
    useState<string>("DESCENDING ORDER");
  const categorySortingModeList: string[] = [
    "ALPHABETICAL ORDER",
    "ASCENDING ORDER",
    "DESCENDING ORDER",
  ];
  const [modelSortingMode, setModelSortingMode] = useState<string>("LATIN");
  const modelSortingModeList: string[] = CATEGORY;
  const [showPercentage, setShowPercentage] = useState<boolean>(true);

  return (
    <div className="grid-container pb-4">
      <ToolBar
        classes="flex-none p-4 w-full"
        highlightCategory={highlightCategory}
        setHighlightCategory={setHighlightCategory}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        categorySortingMode={categorySortingMode}
        setCategorySortingMode={setCategorySortingMode}
        displayModeList={displayModeList}
        categorySortingModeList={categorySortingModeList}
        modelSortingMode={modelSortingMode}
        setModelSortingMode={setModelSortingMode}
        modelSortingModeList={modelSortingModeList}
        showPercentage={showPercentage}
        setShowPercentage={setShowPercentage}
      />
      <DataTable
        data={OVERVIEW}
        classes="overflow-y-auto"
        highlightCategory={highlightCategory}
        displayMode={displayMode}
        categorySortingMode={categorySortingMode}
        modelSortingMode={modelSortingMode}
        showPercentage={showPercentage}
        setModelSortingMode={setModelSortingMode}
        setHighlightCategory={setHighlightCategory}
      />
    </div>
  );
}

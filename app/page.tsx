"use client";
import { useState } from "react";
import { DataTable } from "@/components/homepage/DataTable";
import { ToolBar } from "@/components/homepage/ToolBar";
import OVERVIEW from "@/data/overview";
import { CATEGORY } from "@/libs/utils";

export default function Home() {
  const [highlightCategory, setHighlightCategory] = useState<string>("");
  const [displayMode, setDisplayMode] = useState<string>("PERCENTAGE");
  const displayModeList: string[] = ["COUNT", "PERCENTAGE"];
  const [categorySortingMode, setCategorySortingMode] =
    useState<string>("DESCENDING ORDER");
  const categorySortingModeList: string[] = [
    "ALPHABETICAL ORDER",
    "ASCENDING ORDER",
    "DESCENDING ORDER"
  ];
  const [modelSortingMode, setModelSortingMode] = useState<string>("LATIN");
  const modelSortingModeList: string[] = CATEGORY;

  return (
    <div className="">
      <ToolBar
        classes="fixed top-16 left-0 p-4 w-full h-[12vh]"
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
      />
      <DataTable
        data={OVERVIEW}
        classes="absolute top-40 px-6 pb-4"
        highlightCategory={highlightCategory}
        displayMode={displayMode}
        categorySortingMode={categorySortingMode}
        modelSortingMode={modelSortingMode}
      />
    </div>
  );
}

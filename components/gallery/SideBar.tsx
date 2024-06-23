import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import { ModelBox } from "@/components/ModelBox";
import { CategoryBox } from "@/components/CategoryBox";
import { MODEL_DICT } from "@/libs/utils";
import { SearchBar } from "@/components/SearchBar";
import { CATEGORY } from "@/libs/utils";

type SideBarProps = {
  classes?: string;
  model: string;
  category: string;
};

export const SideBar = (props: SideBarProps) => {
  const router = useRouter();
  const [newModel, setNewModel] = useState(props.model);
  const [newCategory, setNewCategory] = useState(props.category);
  const company =
    MODEL_DICT[
      MODEL_DICT.findIndex((item) => item.model.toLowerCase() === props.model)
    ].company;

  return (
    <div className={cn(props.classes + " flex-between flex-col pb-4")}>
      <div className="flex flex-col items-center gap-1">
        <ModelBox model={props.model} company={company} />
        <SearchBar
          inputValue={newModel}
          setInputValue={setNewModel}
          onSelect={(model: string) =>
            router.push(`/gallery/${model.toLowerCase()}/${props.category}`)
          }
          candidateList={MODEL_DICT.map((item) => item.model)}
          placeholder="Search model ..."
          classes="w-[150px]"
          small={true}
        />
        <CategoryBox classes="bg-gray-500" category={props.category} />
        <SearchBar
          inputValue={newCategory}
          setInputValue={setNewCategory}
          onSelect={(category: string) =>
            router.push(`/gallery/${props.model}/${category.toLowerCase()}`)
          }
          candidateList={CATEGORY}
          placeholder="Search category ..."
          classes="w-[150px]"
          small={true}
        />
      </div>
    </div>
  );
};

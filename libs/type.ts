import DATA from "@/public/data/overview";
import { CATEGORY } from "@/libs/utils";

export type Data = typeof DATA;

// create a type for keys in the data object
export type DataKeys = keyof Data[0];

export type CellData = {
  [key: string]: string | number;
};

export type Token = {
  model_name: string;
  token_idx: number;
  token: string;
  token_category: string;
};

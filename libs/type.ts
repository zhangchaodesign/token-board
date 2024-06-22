import OVERVIEW from "@/data/overview";

export type Overview = typeof OVERVIEW;

// create a type for keys in the data object
export type DataKeys = keyof Overview[0];

export type CellData = {
  [key: string]: string | number;
};

export type Token = {
  model_name: string;
  token_idx: number;
  token: string;
  token_category: string;
  count: number;
};

import DATA from "@/data/data";
import { CATEGORY } from "@/libs/utils";

export type Data = typeof DATA;

// create a type for keys in the data object
export type DataKeys = keyof Data[0];

export type CellData = {
  [key: string]: string | number;
};

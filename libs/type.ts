import DATA from "@/data/data";

export type Data = typeof DATA;

export type CellData = {
  [key: string]: string | number;
};

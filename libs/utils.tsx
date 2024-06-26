import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import OVERVIEW from "@/data/overview";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY = Object.keys(OVERVIEW[0]).slice(3);

export const MODEL_DICT = OVERVIEW.map((item) => {
  return { company: item.company, model: item.model };
});

export const expand_abbr = (abbr: string) => {
  switch (abbr.toUpperCase()) {
    case "N":
      return "NUMBER";
    case "P":
      return "PUNCTUATION";
    case "S":
      return "SYMBOL";
    case "Z":
      return "SEPARATOR";
    case "C":
      return "CONTROL CHARS";
    case "M":
      return "MYANMAR";
    default:
      return abbr;
  }
};

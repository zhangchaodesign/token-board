import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DATA from "@/public/data/overview";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY = Object.keys(DATA[0]).slice(3);

export const MODEL_DICT = DATA.map((item) => {
  return { company: item.company, model: item.model };
});

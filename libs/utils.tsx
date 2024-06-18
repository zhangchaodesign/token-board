import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DATA from "@/data/data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY = Object.keys(DATA[0]).slice(3);

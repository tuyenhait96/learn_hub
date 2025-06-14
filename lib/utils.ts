import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export default function cn(...input: ClassValue[]) {
  return twMerge(clsx(input));
}

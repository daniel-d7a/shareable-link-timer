import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Unit } from "@/Types/counter";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUnit(value: number, unit: Unit) {
  return value === 1 ? unit : `${unit}s`;
}

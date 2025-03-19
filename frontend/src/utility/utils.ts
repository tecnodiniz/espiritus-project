import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0]?.toUpperCase() || "")
    .slice(0, 2)
    .join("");
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(date);
}

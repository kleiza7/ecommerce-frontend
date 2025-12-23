import { twMerge } from "tailwind-merge";

export const customTwMerge = (
  ...classNames: (string | undefined | false | null)[]
) => {
  return twMerge(classNames.filter(Boolean).join(" "));
};

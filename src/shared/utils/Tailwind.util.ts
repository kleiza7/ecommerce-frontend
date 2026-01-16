import { extendTailwindMerge } from "tailwind-merge";

const twMergeWithDesignSystem = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "s10-l14",
            "s12-l16",
            "s14-l20",
            "s16-l24",
            "s18-l28",
            "s20-l28",
            "s22-l28",
            "s24-l32",
            "s28-l36",
            "s48-l56",
          ],
        },
      ],
    },
  },
});

export const customTwMerge = (
  ...classNames: (string | undefined | false | null)[]
) => {
  return twMergeWithDesignSystem(classNames.filter(Boolean).join(" "));
};

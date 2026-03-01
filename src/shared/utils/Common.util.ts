export const getMaskedName = (fullName: string) => {
  return fullName
    .split(" ")
    .map((part) => {
      if (part.length <= 2) return part;
      return part.slice(0, 2) + "*".repeat(part.length - 2);
    })
    .join(" ");
};

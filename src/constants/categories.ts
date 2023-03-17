import makeTitleCase from "../utils/makeTitleCase";

export const productCategories = [
  "dress",
  "t-shirt",
  "jeans",
  "shoes",
  "coat",
  "suit",
  "cap",
  "socks",
  "gloves",
];

export const tabOptions = [
  {
    label: "All",
    key: "all",
  },
  ...productCategories.map((val) => ({
    label: makeTitleCase(val),
    key: val,
  })),
];

export const selectOptions = productCategories.map((val) => ({
  label: makeTitleCase(val),
  value: val,
}));

import { atom, selector } from "recoil";
import { ICategory } from "./interface";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const categoryState = atom<ICategory[]>({
  key: "categoryList",
  default: [
    { id: 1, text: "TO_DO", isSelected: true },
    {
      id: 2,
      text: "DOING",
      isSelected: false,
    },
    { id: 3, text: "DONE", isSelected: false },
  ],
});

export const categorySelector = selector({
  key: "categorySelector",
  get: ({ get }) => {
    return get(categoryState);
  },
  set: ({ set, get }, newCategories) => {
    set(categoryState, newCategories);
  },
});

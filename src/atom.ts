import { atom, selector } from "recoil";
import { ICategory, ITodo } from "./interface";

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

export const selectedCategoryState = atom<ICategory["text"]>({
  key: "selectedCategory",
  default: "TO_DO",
});

export const categorySelector = selector({
  key: "categorySelector",
  get: ({ get }) => {
    return get(categoryState);
  },
  set: ({ set, get }, newCategories) => {
    set(categoryState, newCategories);
    if (Array.isArray(newCategories)) {
      const selectedCategory = newCategories.find(
        (category: ICategory) => category.isSelected
      );
      if (selectedCategory) {
        set(selectedCategoryState, selectedCategory.text);
      }
    }
  },
});

export const todosState = atom<ITodo[]>({
  key: "todos",
  default: [],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    return get(todosState);
  },
  set: ({ set, get }, newTodos) => {
    set(todosState, newTodos);
  },
});

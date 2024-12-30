export interface ICategory {
  id: number;
  text: string;
  isSelected: boolean;
}

export interface ITodo {
  id: number;
  title: string;
  category: ICategory["text"];
}

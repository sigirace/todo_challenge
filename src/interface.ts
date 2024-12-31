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

export interface DropdownMenuProps {
  x: number;
  y: number;
  items: { text: string; color?: string; onClick: () => void }[];
  onClose: () => void;
}

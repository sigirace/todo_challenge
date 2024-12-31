import styled from "styled-components";
import { ICategory } from "../interface";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

const CategoryBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>`
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.selectedTodoBtnColor : theme.todoBtnColor};
  border: none;
  cursor: pointer;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default function Category({
  category,
  onSelect,
  onDelete,
}: {
  category: ICategory;
  onSelect: () => void;
  onDelete: (categoryId: string) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setIsMenuOpen(true);
  };

  return (
    <CategoryBtn
      isSelected={category.isSelected}
      onClick={() => onSelect()}
      onContextMenu={handleContextMenu}
    >
      {category.text}
      {isMenuOpen && (
        <DropdownMenu
          x={menuPosition.x}
          y={menuPosition.y}
          items={[
            {
              text: "삭제",
              color: "red",
              onClick: () => onDelete(category.text),
            },
          ]}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </CategoryBtn>
  );
}

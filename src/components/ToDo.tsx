import styled from "styled-components";
import { ITodo } from "../interface";
import { useRecoilValue } from "recoil";
import { categorySelector } from "../atom";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

const ToDoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  position: relative;
`;

export default function Todo({ todo }: { todo: ITodo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const categories = useRecoilValue(categorySelector);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <ToDoItem onContextMenu={handleContextMenu}>
      {todo.title}
      {isMenuOpen && (
        <DropdownMenu
          x={menuPosition.x}
          y={menuPosition.y}
          items={[
            {
              text: "삭제",
              color: "red",
              onClick: () => console.log(`삭제: ${todo.title}`),
            },
            ...categories.map((category) => ({
              text: category.text,
              onClick: () => console.log(`카테고리 선택: ${category.text}`),
            })),
          ]}
          onClose={handleCloseMenu}
        />
      )}
    </ToDoItem>
  );
}

import styled from "styled-components";
import { ITodo } from "../interface";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { categorySelector } from "../atom";

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

const DropdownMenu = styled.ul<{ x: number; y: number }>`
  position: fixed;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 10px 0;
  margin: 0;
  z-index: 10;
`;

const DropdownMenuItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "isDeltedColor",
})<{ isDeltedColor?: string }>`
  color: ${({ isDeltedColor }) => isDeltedColor || "black"};
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function Todo({ todo }: { todo: ITodo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const categories = useRecoilValue(categorySelector);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setIsMenuOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <ToDoItem onContextMenu={handleContextMenu} ref={menuRef}>
      {todo.title}
      {isMenuOpen && (
        <DropdownMenu x={menuPosition.x} y={menuPosition.y}>
          <DropdownMenuItem isDeltedColor="red">삭제</DropdownMenuItem>
          {categories.map((category) => {
            return (
              <DropdownMenuItem key={category.id}>
                {category.text}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenu>
      )}
    </ToDoItem>
  );
}

import styled from "styled-components";
import { ITodo } from "../interface";
import { useEffect, useRef, useState } from "react";

const ToDoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  position: relative;
  cursor: pointer;
`;

const DropdownMenu = styled.ul<{ x: number; y: number }>`
  position: fixed; /* 화면 좌표 기준으로 고정 */
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

const DropdownMenuItem = styled.li`
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

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY }); // 마우스 클릭 위치 저장
    setIsMenuOpen(true); // 드롭다운 메뉴 열기
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false); // 드롭다운 메뉴 닫기
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
          <DropdownMenuItem>삭제</DropdownMenuItem>
          <DropdownMenuItem>할 일 2</DropdownMenuItem>
          <DropdownMenuItem>할 일 3</DropdownMenuItem>
        </DropdownMenu>
      )}
    </ToDoItem>
  );
}

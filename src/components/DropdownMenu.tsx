import styled from "styled-components";
import { useEffect, useRef } from "react";
import { DropdownMenuProps } from "../interface";

const DropdownContainer = styled.ul<{ x: number; y: number }>`
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
  shouldForwardProp: (prop) => prop !== "isDeletedColor",
})<{ isDeletedColor?: string }>`
  color: ${({ isDeletedColor }) => isDeletedColor || "black"};
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function DropdownMenu({
  x,
  y,
  items,
  onClose,
}: DropdownMenuProps) {
  const menuRef = useRef<HTMLUListElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer x={x} y={y} ref={menuRef}>
      {items.map((item, index) => (
        <DropdownMenuItem
          key={index}
          isDeletedColor={item.color}
          onClick={(e) => {
            e.stopPropagation();
            item.onClick();
            onClose();
          }}
        >
          {item.text}
        </DropdownMenuItem>
      ))}
    </DropdownContainer>
  );
}

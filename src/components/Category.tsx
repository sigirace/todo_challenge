import styled from "styled-components";
import { ICategory } from "../interface";

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
  onClick,
}: {
  category: ICategory;
  onClick: () => void;
}) {
  return (
    <CategoryBtn isSelected={category.isSelected} onClick={() => onClick()}>
      {category.text}
    </CategoryBtn>
  );
}

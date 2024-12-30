import styled from "styled-components";
import { ITodo } from "../interface";

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
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("드롭다운 메뉴 열기");
  };
  return <ToDoItem onContextMenu={handleContextMenu}>{todo.title}</ToDoItem>;
}

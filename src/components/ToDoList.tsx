import styled from "styled-components";
import { ITodo } from "../interface";
import Todo from "./ToDo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 480px;
  margin: 0 auto;
`;

const ToDoItems: ITodo[] = [
  { id: 1, title: "할 일 1할 일 1할 일 1할 일 1할 일 1", category: "TO_DO" },
  { id: 2, title: "할 일 2", category: "DOING" },
  { id: 3, title: "할 일 3", category: "DONE" },
];

export default function ToDoList() {
  return (
    <Container>
      {ToDoItems.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </Container>
  );
}

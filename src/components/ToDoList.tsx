import styled from "styled-components";
import { ITodo } from "../interface";
import Todo from "./ToDo";
import { useEffect } from "react";
import { todoSelector } from "../atom";
import { useRecoilState } from "recoil";
import ToDoInput from "./ToDoInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 480px;
  margin: 0 auto;
`;

export default function ToDoList() {
  const [todos, setTodos] = useRecoilState(todoSelector);
  const onAddTodo = (todo: ITodo) => {
    localStorage.setItem("todos", JSON.stringify([...todos, todo]));
    setTodos([...todos, todo]);
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(todos);
  }, []);
  return (
    <>
      <ToDoInput onAddTodo={onAddTodo} />
      <Container>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </Container>
    </>
  );
}

import styled from "styled-components";
import { ITodo } from "../interface";
import Todo from "./ToDo";
import { useEffect } from "react";
import { todoSelector, todosState } from "../atom";
import { useRecoilState, useRecoilValue } from "recoil";
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
  const totalTodos = useRecoilValue(todosState);
  const [todos, setTodos] = useRecoilState(todoSelector);

  const onChangeCategory = (todoId: number, category: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todoId ? { ...t, category: category } : t))
    );
  };

  const onDeleteTodo = (todoId: number) => {
    localStorage.setItem(
      "todos",
      JSON.stringify(totalTodos.filter((t) => t.id !== todoId))
    );
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todoId));
  };

  const onAddTodo = (todo: ITodo) => {
    localStorage.setItem("todos", JSON.stringify([...totalTodos, todo]));
    setTodos([...totalTodos, todo]);
  };

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(localTodos);
  }, []);
  return (
    <>
      <ToDoInput onAddTodo={onAddTodo} />
      <Container>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onChangeCategory={onChangeCategory}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </Container>
    </>
  );
}

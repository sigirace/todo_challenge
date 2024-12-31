import { useRef } from "react";
import styled from "styled-components";
import { ITodo } from "../interface";
import { useRecoilValue } from "recoil";
import { selectedCategoryState } from "../atom";

const Container = styled.div`
  display: flex;
  width: 480px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 50px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default function ToDoInput({
  onAddTodo,
}: {
  onAddTodo: (todo: ITodo) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedCategory = useRecoilValue(selectedCategoryState);
  const handleAddTodo = () => {
    if (inputRef.current) {
      const newTodo: ITodo = {
        id: Date.now(),
        title: inputRef.current.value,
        category: selectedCategory,
      };
      onAddTodo(newTodo);
      inputRef.current.value = "";
    }
  };

  return (
    <Container>
      <Input placeholder="할 일을 입력하세요" ref={inputRef} />
      <Button onClick={handleAddTodo}>추가</Button>
    </Container>
  );
}

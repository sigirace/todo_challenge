import styled from "styled-components";

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

export default function ToDoInput() {
  return (
    <Container>
      <Input placeholder="할 일을 입력하세요" />
      <Button>추가</Button>
    </Container>
  );
}

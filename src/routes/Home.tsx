import styled from "styled-components";
import CategoryList from "../components/CategoryList";
import ToDoList from "../components/ToDoList";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export default function Home() {
  return (
    <MainContainer>
      <CategoryList />
      <ToDoList />
    </MainContainer>
  );
}

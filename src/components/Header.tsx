import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atom";

const Container = styled.div`
  display: flex;
  max-width: 480px;
  margin: 0 auto;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const DarkModeButton = styled.i`
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  cursor: pointer;
`;

export default function Header() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleDarkMode = () =>
    setIsDark((prev) => {
      return !prev;
    });

  return (
    <Container>
      <Title>Todo List</Title>
      <DarkModeButton
        className={isDark ? "fas fa-sun" : "fas fa-moon"}
        onClick={toggleDarkMode}
      ></DarkModeButton>
    </Container>
  );
}

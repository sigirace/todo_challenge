import { DefaultTheme } from "styled-components";

const darkTheme: DefaultTheme = {
  textColor: "white",
  bgColor: "#2f3640",
  accentColor: "#44bd32",
  todoBtnColor: "#e1b12c",
  selectedTodoBtnColor: "#c23616",
};

const lightTheme: DefaultTheme = {
  textColor: "black",
  bgColor: "#f5f6fa",
  accentColor: "#44bd32",
  todoBtnColor: "#fbc531",
  selectedTodoBtnColor: "#e84118",
};

export { darkTheme, lightTheme };

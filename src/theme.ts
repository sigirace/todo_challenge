import { DefaultTheme } from "styled-components";

const darkTheme: DefaultTheme = {
  textColor: "white",
  bgColor: "#2f3640",
  cardBgColor: "#f5f6fa",
  cardTextColor: "black",
  borderColor: "#f5f6fa",
  accentColor: "#44bd32",
};

const lightTheme: DefaultTheme = {
  textColor: "black",
  bgColor: "#f5f6fa",
  cardBgColor: "white",
  cardTextColor: "black",
  borderColor: "black",
  accentColor: "#44bd32",
};

export { darkTheme, lightTheme };

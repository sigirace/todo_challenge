import styled from "styled-components";
import { ICategory } from "../interface";
import CategoryList from "../components/CategoryList";

export default function Home() {
  const categories: ICategory[] = JSON.parse(
    localStorage.getItem("categories") || "[]"
  );
  return (
    <div>
      <CategoryList />
    </div>
  );
}

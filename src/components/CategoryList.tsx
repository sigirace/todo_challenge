import styled from "styled-components";
import Category from "./Category";
import { ICategory } from "../interface";
import { useRecoilState } from "recoil";
import { categorySelector } from "../atom";
import { useEffect, useState } from "react";
import CategoryModal from "./CategoryModal";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  width: 480px;
  margin: 0 auto;
  gap: 10px;
`;

const AddButton = styled.button`
  background-color: gray;
  border: none;
  cursor: pointer;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default function CategoryList() {
  const [categoryList, setCategoryList] = useRecoilState(categorySelector);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryClick = (category: ICategory) => {
    const updatedCategories = categoryList.map((c: ICategory) => {
      return c.id === category.id
        ? { ...c, isSelected: true }
        : { ...c, isSelected: false };
    });
    setCategoryList(updatedCategories);
  };

  const handleOnAddClick = (newCategory: ICategory) => {
    const localStorageCategories = JSON.parse(
      localStorage.getItem("categories") || "[]"
    );
    localStorage.setItem(
      "categories",
      JSON.stringify([...localStorageCategories, newCategory])
    );
    const updatedCategories = categoryList.map((c: ICategory) => {
      return { ...c, isSelected: false };
    });
    setCategoryList([...updatedCategories, newCategory]);
  };

  useEffect(() => {
    const localStorageCategories = JSON.parse(
      localStorage.getItem("categories") || "[]"
    );
    const updatedCategories = localStorageCategories.map((c: ICategory) => {
      return { ...c, isSelected: false };
    });
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setCategoryList([...categoryList, ...updatedCategories]);
  }, []);

  return (
    <Container>
      {categoryList.map((category) => (
        <Category
          key={category.id}
          category={category}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
      <AddButton onClick={() => setIsModalOpen(true)}>+</AddButton>
      {isModalOpen && (
        <CategoryModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleOnAddClick}
        />
      )}
    </Container>
  );
}

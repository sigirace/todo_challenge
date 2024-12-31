import styled from "styled-components";
import Category from "./Category";
import { ICategory } from "../interface";
import { useRecoilState, useRecoilValue } from "recoil";
import { categorySelector, selectedCategoryState } from "../atom";
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
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );

  const onDeleteCategory = (category: string) => {
    if (category === "TO_DO" || category === "DONE" || category === "DOING") {
      alert("기본 카테고리는 삭제할 수 없습니다.");
      return;
    }
    const updatedCategories = categoryList.filter((c) => c.text !== category);

    if (category === selectedCategory) {
      setSelectedCategory(updatedCategories[0]?.text || "");
      setCategoryList(
        updatedCategories.map((c, index) => ({
          ...c,
          isSelected: index === 0,
        }))
      );
    } else {
      setCategoryList(updatedCategories);
    }
    const filteredCategories = updatedCategories.filter(
      (c) => c.text !== "TO_DO" && c.text !== "DONE" && c.text !== "DOING"
    );
    localStorage.setItem("categories", JSON.stringify(filteredCategories));
  };

  const handleCategoryClick = (category: ICategory) => {
    console.log("handleCategoryClick");
    console.log("category", category);
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
          onSelect={() => handleCategoryClick(category)}
          onDelete={() => onDeleteCategory(category.text)}
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

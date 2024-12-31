import React from "react";
import styled from "styled-components";
import { ICategory } from "../interface";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #3498db;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`;

interface ModalProps {
  onClose: () => void;
  onAdd: (category: ICategory) => void;
}

export default function Modal({ onClose, onAdd }: ModalProps) {
  const [text, setText] = React.useState("");

  const handleAddClick = () => {
    if (text.trim()) {
      setText("");
      onAdd({ id: new Date().getTime(), text, isSelected: true });
      onClose();
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>Add New Category</ModalHeader>
        <Input
          type="text"
          placeholder="Enter category name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <Button onClick={handleAddClick}>Add</Button>
          <Button onClick={onClose} style={{ backgroundColor: "gray" }}>
            Cancel
          </Button>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
}

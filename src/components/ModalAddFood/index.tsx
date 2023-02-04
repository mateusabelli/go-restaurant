import { createRef } from "react";
import {
  FiAlignLeft,
  FiCheckSquare,
  FiDollarSign,
  FiLink,
  FiTag,
} from "react-icons/fi";

import { FormHandles } from "@unform/core";
import { FoodItem } from "../Food";
import Input from "../Input";
import Modal from "../Modal";
import { Form } from "./styles";

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: FoodItem) => Promise<void>;
}

function ModalAddFood({ isOpen, handleAddFood, setIsOpen }: ModalAddFoodProps) {
  const formRef = createRef<FormHandles>();

  const handleSubmit = async (data: FoodItem) => {
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>

        <Input
          name="image"
          placeholder="Link da imagem de fundo"
          icon={FiLink}
        />
        <Input name="name" placeholder="Ex: Moda Italiana" icon={FiTag} />
        <Input name="price" placeholder="Ex: 19.90" icon={FiDollarSign} />
        <Input name="description" placeholder="Descrição" icon={FiAlignLeft} />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood;

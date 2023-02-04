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

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodItem;
  handleUpdateFood: (food: FoodItem) => Promise<void>;
}

function ModalEditFood({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}: ModalEditFoodProps) {
  const formRef = createRef<FormHandles>();

  const handleSubmit = async (data: FoodItem) => {
    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>

        <Input
          name="image"
          placeholder="Link da imagem de fundo"
          icon={FiLink}
        />
        <Input name="name" placeholder="Ex: Moda Italiana" icon={FiTag} />
        <Input name="price" placeholder="Ex: 19.90" icon={FiDollarSign} />
        <Input name="description" placeholder="Descrição" icon={FiAlignLeft} />

        <button type="submit" data-testid="edit-food-button">
          <p className="text">Editar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalEditFood;

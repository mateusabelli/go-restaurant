import { useEffect, useState } from "react";

import Food, { FoodItem } from "../../components/Food";
import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import api from "../../services/api";
import { FoodsContainer } from "./styles";

function Dashboard() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [editingFood, setEditingFood] = useState<FoodItem>({} as FoodItem);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const getData = async () => {
    const response = await api.get("/foods");
    const food: FoodItem[] = response.data;

    setFoods([...food]);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddFood = async (food: FoodItem) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      const newFood: FoodItem = response.data;
      setFoods([...foods, newFood]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: FoodItem) => {
    try {
      const response = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });
      const foodUpdated: FoodItem = response.data;

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.id ? f : foodUpdated
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: string) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods([...foodsFiltered]);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: FoodItem) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;

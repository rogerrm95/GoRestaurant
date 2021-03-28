import { useEffect, useState } from 'react';

import api from '../../services/api';
import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

import { FoodsData, ReceivedFoodData } from '../../types'

export function Dashboard() {
    const [foods, setFoods] = useState<FoodsData[]>([])
    const [editingFood, setEditingFood] = useState<FoodsData>({} as FoodsData)
    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)

    useEffect(() => {

        api.get<FoodsData[]>('/foods').then(res => setFoods(res.data));

    }, [])

    async function handleAddFood(food: ReceivedFoodData) {

        try {
            const data = await api.post('/foods', { ...food, available: true }).then(res => res.data)

            setFoods([...foods, data])
        }
        catch (error) {
            console.log(error)
        }
    }

    async function handleUpdateFood(food: ReceivedFoodData) {
        try {

            const foodUpdated = await api.put<FoodsData>(`/foods/${editingFood?.id}`, { ...editingFood, ...food })
                .then(res => res.data)

            const foodsUpdated = foods.map(f => {
                return f.id !== foodUpdated.id ? f : foodUpdated
            })

            setFoods(foodsUpdated)


        } catch (error) {
            console.log(error)
        }
    }

    async function handleDeleteFood(id: number) {

        await api.delete(`/foods/${id}`)

        const foodFiltered = foods.filter(f => f.id !== id)

        setFoods(foodFiltered)
    }

    function handleEditFood(food: FoodsData) {
        setEditingFood(food)
        setEditModalOpen(true)
    }

    function toggleModal() {
        setModalOpen(!modalOpen)
    }

    function toggleEditModal() {
        setEditModalOpen(!editModalOpen)
    }

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
                    foods.map(food => (
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
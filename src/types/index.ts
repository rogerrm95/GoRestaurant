import { InputHTMLAttributes, ReactNode } from "react";
import { IconType } from "react-icons/lib";

export interface FoodsData {
    id: number,
    description: string,
    image: string,
    name: string,
    price: string,
    available: boolean
}

export type ReceivedFoodData = Omit<FoodsData, "id" | "avaliable">

export interface ModalEditFoodProps {
    setIsOpen: () => void,
    handleUpdateFood: (food: ReceivedFoodData) => void,
    isOpen: boolean,
    editingFood: FoodsData
}

export interface ModalAddFoodProps {
    setIsOpen: () => void,
    handleAddFood: (food: ReceivedFoodData) => void,
    isOpen: boolean,
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    Icon?: IconType,
}

export interface ModalProps {
    setIsOpen: () => void,
    isOpen: boolean,
    children: ReactNode
}

export interface HeaderProps {
    openModal: () => void
}

export interface FoodProps {
    handleDelete: (id: number) => void,
    handleEditFood: (food: FoodsData) => void,
    food: FoodsData
}

// Styled Components //

export interface InputStyledProps {
    isFocused: boolean,
    isFilled: boolean
}

export interface DivFoodStyledProps {
    available: boolean
}
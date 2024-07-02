import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

import { Product, Size } from "@/types";

interface CartStore {
    items: { product: Product; size: Size }[]
    addItem: (data: { product: Product; size: Size }) => void
    removeItem: (id: string, sizeId: string) => void
    removeAll: () => void
}

export const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: { product: Product; size: Size }) => {
            const currentItens = get().items
            const existingItens = currentItens.find(
                (item) => item.product.id === data.product.id && item.size.id === data.size.id
            );

            if (existingItens) {
                return toast('Item already in cart.')
            }

            set({
                items: [...get().items, data]
            })
            toast.success('Item added to cart.')
        },
        removeItem: (id: string, sizeId: string) => {
            set({
                items: get().items.filter((item) => !(item.product.id === id && item.size.id === sizeId))
            })
            toast.success('Item removed from cart.')
        },
        removeAll: () => set({ items: [] })
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage)
    })
)
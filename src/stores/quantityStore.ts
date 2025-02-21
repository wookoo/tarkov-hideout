import {create} from "zustand/react";

interface QuantityStoreState {
    quantityItems: Record<string, number>;
    setQuantity: (key: string, quantity: number) => void;
    resetQuantity: () => void;
}


const useQuantityStores = create<QuantityStoreState>((set) => ({
    quantityItems: {},
    setQuantity: (key, quantity) => set((state) => ({
        quantityItems: {
            ...state.quantityItems,
            [key]: quantity,
        },
    })),
    resetQuantity: () => set(() => ({
        quantityItems: {}
    }))

}));

export default useQuantityStores;
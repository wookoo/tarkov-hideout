// 아이템의 타입 정의
import {create} from "zustand/react";

interface ItemState {
    count: number;
    image: string;
    name: string;
    wiki: string;
}


interface StoreState {
    items: Record<string, ItemState>;
    isRender: boolean;
    addItem: (key: string, item: ItemState) => void;
    increaseItemCount: (key: string, count: number) => void;
    decreaseItemCount: (key: string, count: number) => void;
    updateItemName: (key: string, name: string) => void;
    render: () => void;

}


const useItemStore = create<StoreState>((set) => ({
    items: {},

    isRender: false,
    render: () => set(() => ({isRender: true})),
    addItem: (key, item) => set((state) => ({
        items: {
            ...state.items,
            [key]: item,
        },
    })),

    increaseItemCount: (key: string, count: number) => set((state) => ({
        items: {
            ...state.items,
            [key]: {
                ...state.items[key],
                count: state.items[key].count + count, // 기존 count에 더하기
            },
        },
    })),

    decreaseItemCount: (key: string, count: number) => set((state) => ({
        items: {
            ...state.items,
            [key]: {
                ...state.items[key],
                count: state.items[key].count - count, // 기존 count에 더하기
            },
        },
    })),


    updateItemName: (key, name) => set((state) => ({
        items: {
            ...state.items,
            [key]: {...state.items[key], name},
        },
    })),
}));

export default useItemStore;

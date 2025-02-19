import {create} from "zustand/react";


interface StoreState {
    levels: Record<string, number>;
    setLevel: (key: string, level: number) => void;


}

const useLevelStore = create<StoreState>((set) => ({
    levels: {},
    setLevel: (key, level) => set((state) => ({
        levels: {
            ...state.levels,
            [key]: level
        },
    })),


}));

export default useLevelStore;
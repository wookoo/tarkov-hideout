import {create} from "zustand/react";


interface StoreState {
    levels: Record<string, number>;
    setLevel: (key: string, level: number) => void;
    resetLevel: () => void;

}

const useLevelStore = create<StoreState>((set) => ({
    levels: {},
    setLevel: (key, level) => set((state) => ({
        levels: {
            ...state.levels,
            [key]: level
        },
    })),
    resetLevel: () => set(() => ({
        levels: {}
    }))


}));

export default useLevelStore;
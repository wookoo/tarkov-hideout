import {create} from "zustand/react";

interface StoreState {
    isInit: boolean;
    init: () => void;

}

const useInitStore = create<StoreState>((set) => ({
    isInit: false,
    init: () => set(() => ({isInit: true}))
}));

export default useInitStore;
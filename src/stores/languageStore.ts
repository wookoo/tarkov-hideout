import {create} from "zustand/react";


interface LanguageState {
    language: boolean;
    changeLanguage : () => void;
}

const useLanguageStore = create<LanguageState>((set) => ({
    language: true,
    changeLanguage: () => set((state) => ({ language : !state.language })),
}))

export default  useLanguageStore;
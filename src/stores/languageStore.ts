import {create} from "zustand/react";


interface LanguageState {
    language: boolean;
    changeLanguage : (language: boolean) => void;
}

const useLanguageStore = create<LanguageState>((set) => ({
    language: true,
    changeLanguage: (language : boolean) => set(() => ({ language : language })),
}))

export default  useLanguageStore;
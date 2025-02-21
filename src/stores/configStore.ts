import {create} from "zustand/react";
import kor from "../assets/generic-kor.json";
import eng from "../assets/generic-eng.json";

interface ConfigState {
    language: boolean; //언어 true 한글
    gameMode: boolean; //게임모드 true pvp
    choice: boolean; //ONE ALL 선택 true ONE
    pack: any;
    changeLanguage: (language: boolean) => void;
    changeGameMode: (mode: boolean) => void;
    changeChoice: (choice: boolean) => void;
}

const useConfigStore = create<ConfigState>((set) => ({
    language: true,
    gameMode: true,
    choice: true,
    pack: kor,
    changeLanguage: (language: boolean) => set(() => {
        if (language) {
            return {language, pack: kor};
        }
        return {language, pack: eng}
    }),

    changeGameMode: (mode: boolean) => set(() => ({gameMode: mode})),
    changeChoice: (choice: boolean) => set(() => ({choice: choice}))
}))

export default useConfigStore;
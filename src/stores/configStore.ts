import {create} from "zustand/react";

interface ConfigState {
    language: boolean; //언어 true 한글
    gameMode: boolean; //게임모드 true pvp
    choice: boolean; //ONE ALL 선택 true ONE
    changeLanguage: (language: boolean) => void;
    changeGameMode: (mode: boolean) => void;
    changeChoice: (choice: boolean) => void;
}

const useConfigStore = create<ConfigState>((set) => ({
    language: true,
    gameMode: true,
    choice: true,
    changeLanguage: (language: boolean) => set(() => ({language: language})),
    changeGameMode: (mode: boolean) => set(() => ({gameMode: mode})),
    changeChoice: (choice: boolean) => set(() => ({choice: choice}))
}))

export default useConfigStore;
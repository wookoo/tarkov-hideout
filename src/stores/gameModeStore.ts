import {create} from "zustand/react";


interface GameModeState {
    gameMode: boolean;
    changeGameMode: (mode: boolean) => void;
}

const useGameModeStore = create<GameModeState>((set) => ({
    gameMode: true,
    changeGameMode: (mode: boolean) => set(() => ({gameMode: mode})),
}))

export default useGameModeStore;
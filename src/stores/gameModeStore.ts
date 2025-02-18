import {create} from "zustand/react";


interface GameModeState {
    gameMode: boolean;
    changeGameMode: (mode: boolean) => void;
}

const useGameModeState = create<GameModeState>((set) => ({
    gameMode: true,
    changeGameMode: (mode: boolean) => set(() => ({gameMode: mode})),
}))

export default useGameModeState;
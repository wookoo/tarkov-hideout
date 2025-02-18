import useLanguageStore from "../stores/languageStore.ts";
import {useEffect, useState} from "react";
import kor from "../assets/generic-kor.json"
import eng from "../assets/generic-eng.json"
import {IoSettings} from "react-icons/io5";
import useGameModeState from "../stores/gameModeStore.ts";

export default function Navbar() {

    const {language, changeLanguage} = useLanguageStore();

    const {gameMode, changeGameMode} = useGameModeState();

    const [pack, setPack] = useState(kor);

    const [show, setShow] = useState(true);

    useEffect(() => {

        if (language) {
            setPack(kor)
            return
        }
        setPack(eng)
    }, [language])

    return (

        <nav className="max-w-7xl bg-gray-600 p-4 text-white flex flex-col">
            <div className={"flex"}>
                <div>{pack.title}</div>
                <div className="ml-auto">
                    <div className={"flex items-center"}>
                        {pack.config}
                        <IoSettings size={20}/>
                    </div>
                </div>


            </div>
            {
                show && <div className={"flex mt-2"}>
                    <div className={"flex gap-2"}>
                        <button
                            className={`px-1 rounded ${gameMode ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
                            onClick={() => {
                                changeGameMode(true)
                            }
                            }>PVP
                        </button>
                        <button
                            className={`px-1 rounded ${!gameMode ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
                            onClick={() => {
                                changeGameMode(false)
                            }
                            }>PVE
                        </button>
                    </div>
                    <div className={"ml-auto flex gap-2"}>
                        <button
                            className={`px-1 rounded ${language ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
                            onClick={() => {
                                changeLanguage(true)
                            }
                            }>한국어
                        </button>
                        <button
                            className={`px-1 rounded ${!language ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
                            onClick={() => {
                                changeLanguage(false)
                            }
                            }>eng
                        </button>
                    </div>


                </div>
            }

        </nav>
    );
}

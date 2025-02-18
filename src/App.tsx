import {useEffect, useState} from 'react'

import './App.css'
import Navbar from "./components/NavBar.tsx";
import useLanguageStore from "./stores/languageStore.ts";
import useGameModeStore from "./stores/gameModeStore.ts";
import pveKorean from "./assets/pve-kor.json"
import pveEnglish from "./assets/pve-eng.json"
import pvpKorean from "./assets/pvp-kor.json"
import pvpEnglish from "./assets/pvp-eng.json"
import Section from "./components/Section.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {
    const {language} = useLanguageStore();

    const {gameMode} = useGameModeStore();


    const [lang, setLang] = useState(pveKorean);
    useEffect(() => {
        if (language) {
            if (gameMode) {
                setLang(pvpKorean);
                return;
            }
            else{
                setLang(pveKorean)
                return;
            }
        }
        else{
            if(gameMode){
                setLang(pvpEnglish);
                return;
            }
            else{
                setLang(pveEnglish);
                return;
            }
        }
    }, [language,gameMode])

    return (
        <>
            <BrowserRouter>
                <Navbar/>
                {lang.data.hideoutStations.map((item, index) => (
                    <Section name={item.name} image={item.imageLink} items={item.levels} key={index}/>
                ))}
            </BrowserRouter>


        </>
    )
}

export default App

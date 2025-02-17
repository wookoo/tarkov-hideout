import {useEffect, useState} from 'react'

import './App.css'
import Navbar from "./components/NavBar.tsx";
import useLanguageStore from "./stores/languageStore.ts";

import korean from "./assets/pve-kor.json"
import english from "./assets/pve-eng.json"
import Section from "./components/Section.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {
    const {language} = useLanguageStore();
    const [lang, setLang] = useState(korean);
    useEffect(() => {
        if (language) {
            setLang(korean);
            return;
        }
        setLang(english);
    }, [language])

    return (
        <>
            <BrowserRouter>
                <Navbar/>
                {lang.data.hideoutStations.map((item, index) => (
                    <Section name={item.name} image={item.imageLink} items={item.levels}  id={index} key={index}/>
                ))}
            </BrowserRouter>


        </>
    )
}

export default App

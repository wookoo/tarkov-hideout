import {useEffect, useState} from 'react'

import './App.css'
import Navbar from "./components/NavBar.tsx";

import pveKorean from "./assets/pve-kor.json"
import pveEnglish from "./assets/pve-eng.json"
import pvpKorean from "./assets/pvp-kor.json"
import pvpEnglish from "./assets/pvp-eng.json"
import Section from "./components/Section.tsx";
import {BrowserRouter} from "react-router-dom";
import useConfigStore from "./stores/configStore.ts";
import useItemStore from "./stores/ItemStore.ts";
import ItemAsset from "./components/ItemAsset.tsx";
import removePrefixAndSuffix from "./utils/removePrefixAndSuffix.ts";


function App() {
    const {language, gameMode} = useConfigStore();
    const [lang, setLang] = useState(pveKorean);
    const {items, addItem, updateItemName,render} = useItemStore();

    useEffect(() => {
        if (language) {
            if (gameMode) {
                setLang(pvpKorean);
                return;
            } else {
                setLang(pveKorean)
                return;
            }
        } else {
            if (gameMode) {
                setLang(pvpEnglish);
                return;
            } else {
                setLang(pveEnglish);
                return;
            }
        }
    }, [language, gameMode])

    useEffect(() => {
        for (let item of lang.data.hideoutStations) {
            for (let level of item.levels) {
                for (let i of level.itemRequirements) {
                    const name = i.item.name;
                    const wiki = i.item.wikiLink;
                    const image = i.item.imageLink;
                    const id = removePrefixAndSuffix(image);

                    const data = {
                        name: name,
                        wiki: wiki,
                        count: 0,
                        image: image,
                    }

                    if (items[id] === undefined) {
                        addItem(id, data);
                    }
                }
            }
        }

        render();

    }, []);

    useEffect(() => {
        for (let item of lang.data.hideoutStations) {
            for (let level of item.levels) {
                for (let i of level.itemRequirements) {
                    const name = i.item.name;
                    const image = i.item.imageLink;
                    const id = removePrefixAndSuffix(image);
                    updateItemName(id, name)
                }
            }
        }

    }, [lang]);


    return (
        <>
            <BrowserRouter>
                <Navbar/>

                {lang.data.hideoutStations.map((item, index) => (
                    <Section name={item.name} image={item.imageLink} items={item.levels} key={index}/>
                ))}

                <div className={"flex flex-col p-3"}>
                    <div className="flex items-center outline outline-1 bg-gray-300 text-2xl p-3">
                        <p>{language ? "남은 아이템 목록" : "Remain Item List"}</p>
                    </div>

                    <div className={"flex flex-col"}>

                        {
                            Object.entries(items).map(([key, item]) => (
                                item.count > 0 &&
                                <ItemAsset key={key} count={item.count} image={item.image} wiki={item.wiki}
                                           name={item.name}/>
                            ))
                        }


                    </div>
                </div>

            </BrowserRouter>


        </>
    )
}


export default App

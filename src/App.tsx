import React, {useEffect, useState} from 'react'

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


const removePrefixAndSuffix = (imageUrl: string) => {
    const prefix = 'https://assets.tarkov.dev/';
    const suffix = '-image.webp';

    // prefix 제거
    let result = imageUrl.startsWith(prefix) ? imageUrl.substring(prefix.length) : imageUrl;

    // suffix 제거
    if (result.endsWith(suffix)) {
        result = result.substring(0, result.length - suffix.length);
    }

    return result;
}


function App() {
    const {language, gameMode} = useConfigStore();
    const [lang, setLang] = useState(pveKorean);
    const {items, addItem, updateItemCount} = useItemStore();

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
                    const count = i.count;
                    const image = i.item.imageLink;
                    const id = removePrefixAndSuffix(image);

                    const data = {
                        name: name,
                        wiki: wiki,
                        count: count,
                        image: image,
                    }

                    if (items[id] === undefined) {
                        addItem(id, data);
                    } else {
                        updateItemCount(id, count); // count를 더하는 로직
                    }
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
                        <p>남은 아이템 목록</p>
                    </div>

                    <div className={"flex flex-col"}>

                        {
                            Object.entries(items).map(([key, item]) => (
                                <ItemAsset key={key} count={item.count} image={item.image} wiki={item.wiki} name={item.name}/>
                            ))
                        }


                    </div>
                </div>

            </BrowserRouter>


        </>
    )
}




export default App

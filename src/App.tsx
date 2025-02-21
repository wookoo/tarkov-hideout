import {useEffect, useState} from 'react'

import './App.css'
import Navbar from "./components/NavBar.tsx";

import pveKorean from "./assets/pve-kor.json"
import pveEnglish from "./assets/pve-eng.json"
import pvpKorean from "./assets/pvp-kor.json"
import pvpEnglish from "./assets/pvp-eng.json"
import Section from "./components/Section.tsx";
import {useLocation} from "react-router-dom";
import useConfigStore from "./stores/configStore.ts";
import useItemStore from "./stores/ItemStore.ts";
import ItemAsset from "./components/ItemAsset.tsx";
import {removePrefixAndSuffix} from "./utils/removePrefixAndSuffix.ts";
import useLevelStore from "./stores/levelStore.ts";
import useInitStore from "./stores/initStore.ts";
import useQuantityStores from "./stores/quantityStore.ts";


function App() {
    const {language, gameMode, pack} = useConfigStore();
    const [lang, setLang] = useState(pveKorean);
    const {items, addItem, updateItemName} = useItemStore();

    const {quantityItems, setQuantity} = useQuantityStores();

    const {levels, setLevel} = useLevelStore();

    const {init, isInit} = useInitStore();

    const location = useLocation();

    // const [columns, setColumns] = useState(1); // 기본적으로 1열로 설정

    // 화면 크기에 따라 `columns` 값을 업데이트하는 함수
    // const updateColumns = () => {
    //     const width = window.innerWidth;
    //     if (width >= 1280) {
    //         setColumns(2); // 큰 화면 (예: 1280px 이상)에서는 4개씩 렌더링
    //     } else {
    //         setColumns(1); // 모바일 화면에서는 1개씩 렌더링
    //     }
    // };


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
        for (const item of lang.data.hideoutStations) {
            for (const level of item.levels) {
                for (const i of level.itemRequirements) {
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
        const params = new URLSearchParams(location.search);
        const levelsParam = params.get('levels');
        let needParseValue = "";
        //levels 파싱 시작
        if (levelsParam) {
            needParseValue = levelsParam;
        } else {
            needParseValue = localStorage.getItem("levels") as string;
        }

        if (needParseValue) {
            const levelString = atob(needParseValue);
            const parsedLevel = JSON.parse(levelString)

            for (const key of Object.keys(parsedLevel)) {
                if (isNaN(+parsedLevel[key])) {

                    setLevel(key, 0)
                } else {
                    setLevel(key, parsedLevel[key])
                }
            }
        }




        const quantityParam = params.get('quantity');
        needParseValue = "";
        //levels 파싱 시작
        if (quantityParam) {
            needParseValue = quantityParam;
        } else {
            needParseValue = localStorage.getItem("quantity") as string;
        }

        if (needParseValue) {
            const levelString = atob(needParseValue);
            const parsedQuantity = JSON.parse(levelString)

            for (const key of Object.keys(parsedQuantity)) {
                if (isNaN(+parsedQuantity[key])) {

                    setQuantity(key, 0)
                } else {
                    setQuantity(key, parsedQuantity[key])
                }
            }
        }
        //수량 파싱 끝



        // updateColumns();
        // window.addEventListener("resize", updateColumns);
        init();

        // return () => {
        //     window.removeEventListener("resize", updateColumns); // 컴포넌트 언마운트 시 이벤트 리스너 정리
        // };


    }, []);

    useEffect(() => {
        if (isInit) {
            const levelSave = btoa(JSON.stringify(levels))
            const quantitySave = btoa(JSON.stringify(quantityItems))
            localStorage.setItem('levels', levelSave); // localStorage에 저장
            localStorage.setItem('quantity', quantitySave)
            window.history.pushState({}, '', `?levels=${levelSave}&quantity=${quantitySave}`)
        }

    }, [levels, quantityItems]);

    useEffect(() => {
        // console.log(JSON.stringify(items))
        for (const key of Object.keys(items)) {
            if (quantityItems[key] === undefined) {
                setQuantity(key, 0);
            }
        }
    }, [items]);

    useEffect(() => {
        for (const item of lang.data.hideoutStations) {
            for (const level of item.levels) {
                for (const i of level.itemRequirements) {
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
            <Navbar/>

            <div className="md:flex md:justify-center min-h-screen">


                <div>

                    <div className="bg-white flex flex-col justify-center lg:grid lg:grid-cols-2">
                        {lang.data.hideoutStations
                            .map((item, index) => (
                                <Section name={item.name} image={item.imageLink} items={item.levels}
                                         key={index}/>
                            ))}
                    </div>
                </div>


                <div className="flex flex-col p-3 bg-white">
                    <div className="flex items-center border border-black bg-gray-300 text-2xl p-3">
                        <p>{language ? "남은 아이템 목록" : "Remain Item List"}</p>
                    </div>

                    <table>
                        <thead className={"border border-black"}>
                        <tr>
                            <th className={"border border-black"}>
                                {pack.image}
                            </th>
                            <th className={"border border-black"}>
                                {pack.name}
                            </th>
                            <th className={"border border-black"}>
                                {pack.need}
                            </th>
                            <th className={"border border-black"}>
                                {pack.have}
                            </th>
                            {/*<th className={"border border-black"}>*/}
                            {/*    {pack.lack}*/}
                            {/*</th>*/}

                        </tr>
                        </thead>
                        <tbody>


                        {Object.entries(items).map(([key, item]) => (
                            <tr>

                                <ItemAsset key={key} count={item.count} image={item.image} wiki={item.wiki}
                                           name={item.name}/>
                                <td className={"border-l border-r border-b border-black  w-16 text-center"}>

                                    <input className={"w-12 text-center"} value={quantityItems[key]}

                                           onChange={(e) => {
                                               const number = Number(e.target.value);
                                               if (!isNaN(number)) {

                                                   setQuantity(key, number)
                                               }
                                           }}

                                    />

                                </td>

                                {/*<td className="border-l border-r border-b border-black text-center w-16 px-3">*/}
                                {/*    {items[key].count - quantityItems[key]}*/}


                                {/*</td>*/}

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );

}


export default App

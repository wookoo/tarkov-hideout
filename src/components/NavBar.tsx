import {useEffect, useState} from "react";
import kor from "../assets/generic-kor.json"
import eng from "../assets/generic-eng.json"
import NavButton from "./NavButton.tsx";
import useConfigStore from "../stores/configStore.ts";
import useLevelStore from "../stores/levelStore.ts";
export default function Navbar() {

    const {language, changeLanguage} = useConfigStore();


    const {resetLevel} = useLevelStore();

    const [pack, setPack] = useState(kor);
    const [show] = useState(true);

    useEffect(() => {

        if (language) {
            setPack(kor)
            return
        }
        setPack(eng)
    }, [language])

    return (

        <nav className="bg-gray-600 p-4 text-white flex flex-col lg:px-16 ">
            <div className={"flex"}>
                <div>{pack.title}</div>
                <div className="ml-auto">
                    <div className={"flex items-center"}>
                        <button className={"px-3 rounded bg-red-500 text-white"} onClick={

                            ()=>{
                                resetLevel();
                                localStorage.clear();
                                window.location.replace("/")
                            }
                        }>{pack.reset}</button>
                    </div>
                </div>
            </div>
            {
                show && <div className={"flex mt-2"}>

                    <div className={"flex gap-2"}>
                        <NavButton onClick={() => {
                            // changeChoice(true)
                        }} flag={false} text={"ONE"}/>
                        <NavButton onClick={() => {
                            // changeChoice(false)
                        }} flag={false} text={"ALL"}/>

                    </div>
                    {/*<div className={"flex gap-2"}>*/}
                    {/*    <NavButton onClick={() => {*/}
                    {/*        changeGameMode(true)*/}
                    {/*    }} flag={gameMode} text={"PVP"}/>*/}
                    {/*    <NavButton onClick={() => {*/}
                    {/*        changeGameMode(false)*/}
                    {/*    }} flag={!gameMode} text={"PVE"}/>*/}

                    {/*</div>*/}
                    {/*PVP PVE 재료가 바뀌면 주석 해제*/}
                    <div className={"ml-auto flex gap-2"}>
                        <NavButton onClick={() => {
                            changeLanguage(true)
                        }} flag={language} text={"한국어"}/>
                        <NavButton onClick={() => {
                            changeLanguage(false)
                        }} flag={!language} text={"eng"}/>
                    </div>
                </div>
            }
            <div className={"mt-1 text-sm flex"}>
                Updated : 2025.02.21
                <div className={"ml-auto"}>
                    Developer Tarkov NickName : wookoo
                </div>
            </div>

        </nav>
    );
}

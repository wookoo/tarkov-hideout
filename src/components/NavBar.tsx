import {useEffect, useState} from "react";
import kor from "../assets/generic-kor.json"
import eng from "../assets/generic-eng.json"
import {IoSettings} from "react-icons/io5";
import NavButton from "./NavButton.tsx";
import useConfigStore from "../stores/configStore.ts";

export default function Navbar() {

    const {language, changeLanguage, gameMode, changeGameMode,choice,changeChoice} = useConfigStore();


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
                        <NavButton onClick={() => {
                            changeChoice(true)
                        }} flag={choice} text={"ONE"}/>
                        <NavButton onClick={() => {
                            changeChoice(false)
                        }} flag={!choice} text={"ALL"}/>

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

        </nav>
    );
}

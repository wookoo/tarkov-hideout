import {useState} from "react";
import NavButton from "./NavButton.tsx";
import useConfigStore from "../stores/configStore.ts";
import useLevelStore from "../stores/levelStore.ts";
import useQuantityStores from "../stores/quantityStore.ts";
export default function Navbar() {

    const {language, changeLanguage,pack} = useConfigStore();


    const {resetLevel} = useLevelStore();
    const {resetQuantity} =useQuantityStores();
    const [show] = useState(true);

    return (

        <nav className="bg-gray-600 p-4 text-white flex flex-col lg:px-16 ">
            <div className={"flex"}>
                <div>{pack.title}</div>
                <div className="ml-auto">
                    <div className={"flex items-center"}>
                        <button className={"px-3 rounded bg-red-500 text-white"} onClick={

                            ()=>{
                                resetLevel();
                                resetQuantity();
                                localStorage.clear();
                                window.location.replace("/tarkov-hideout")
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
                {pack.updated} : {pack.updated_at}
                <div className={"ml-auto"}>
                    {pack.developer_tarkov} : wookoo
                </div>
            </div>

        </nav>
    );
}

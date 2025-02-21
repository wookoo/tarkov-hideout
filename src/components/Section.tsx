import {useEffect, useRef, useState} from "react";
import ItemAsset from "./ItemAsset.tsx";
import useItemStore from "../stores/ItemStore.ts";
import {removePrefixAndSuffix, getStationPrimaryByImageURL} from "../utils/removePrefixAndSuffix.ts";
import useLevelStore from "../stores/levelStore.ts";
import useInitStore from "../stores/initStore.ts";

interface SectionProps {
    name: string,
    image: string,
    items: any[]
}


const Section = ({name, image, items}: SectionProps) => {

    const [level, setLevel] = useState(0);
    // const [show, setShow] = useState(true);
    const {increaseItemCount, decreaseItemCount} = useItemStore();
    const {isInit} = useInitStore();

    const stationId = getStationPrimaryByImageURL(image);


    const {levels, setLevel: setGlobalLevel} = useLevelStore();
    const allItems: { [key: string]: any } = {};
    for (let item of items) {
        for (let i of item.itemRequirements) {
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
            if (allItems[id] === undefined) {
                allItems[id] = data
            } else {
                allItems[id] = {...allItems[id], count: count + allItems[id].count}
            }
        }
    }

    const prevLevelRef = useRef<number>(0);

    useEffect(() => {

        if (isInit) {

            for (const key in allItems) {
                const i = allItems[key];
                // console.log(i)
                increaseItemCount(key, i.count)
            }

            if (levels[stationId] === undefined) {
                setGlobalLevel(stationId, 0);
            } else {
                setLevel(levels[stationId])
            }

        }

    }, [isInit]);

    useEffect(() => {


        if (isInit) {


            setGlobalLevel(stationId, level);

            const prevLevel = prevLevelRef.current;
            if (prevLevel < level) {
                for (let i = prevLevel; i < level; i++) {
                    for (let j of items[i].itemRequirements) {
                        const count = j.count;
                        const image = j.item.imageLink;
                        const id = removePrefixAndSuffix(image);
                        decreaseItemCount(id, count); // 해당 아이템 수량 증가
                    }
                }

            } else {
                for (let i = level; i < prevLevel; i++) {
                    for (let j of items[i].itemRequirements) {
                        const count = j.count;
                        const image = j.item.imageLink;
                        const id = removePrefixAndSuffix(image);
                        increaseItemCount(id, count); // 해당 아이템 수량 증가
                    }
                }
            }
            // 현재 레벨 이상을 더하기

        }

        prevLevelRef.current = level;


    }, [level, isInit]);

    // if (!show) {
    //     return (
    //         <div className={"flex flex-col p-3"} onClick={()=>{setShow(true)}}>
    //             <div
    //                 className={show ? "flex items-center outline outline-1 bg-gray-300" : "flex items-center outline outline-1 bg-black text-white"}>
    //                 <img src={image} alt={name} className="mr-4"/>
    //                 <p>{name}</p>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className={"flex flex-col p-3 max-w-xl"}>
            <div className="flex items-center border border-black bg-gray-300">
                <img src={image} alt={name} className="mr-4"/>
                <p>{name}</p>

                <div className="ml-auto flex">
                    {Array.from({length: items.length + 1}, (_, index) => (
                        <button
                            key={index}
                            className={`mr-2 p-2 border ${index === level ? "bg-green-500 text-white" : "bg-gray-200"}`}
                            onClick={() => setLevel(index)}
                        >
                            {index}
                        </button>
                    ))}
                </div>

            </div>

            {
                items[level] && <table>
                    <tbody>


                    {
                        items[level].itemRequirements.map(
                            (i: any, index: any) => {
                                return (<tr>
                                        <ItemAsset key={index} count={i.count} name={i.item.name} image={i.item.imageLink}
                                                   wiki={i.item.wikiLink}/>


                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                </table>
            }


        </div>
    );
}

export default Section;
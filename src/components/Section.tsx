import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ItemAsset from "./ItemAsset.tsx";

interface SectionProps {
    name: string,
    image: string,
    items: any[],
    id: any
}

const Section = ({name, image, items, id}: SectionProps) => {

    const [level, setLevel] = useState(-1); // 초기 level은 id로 설정


    const [show, setShow] = useState(false);
    let allItems = {}
    for (let item of items) {
        for (let i of item.itemRequirements){

            if(allItems[i.item.name] === undefined){
                allItems[i.item.name] = {
                    wiki : i.item.wikiLink,
                    count : i.count,
                    name : i.item.name,
                    image : i.item.imageLink
                }
            }
            else{
                allItems[i.item.name] = {...allItems[i.item.name],count : allItems[i.item.name].count + i.count}
            }
        }
    }


    return (
        <div className={"flex flex-col p-3"}>
            <div className="flex items-center outline outline-1 bg-gray-300">
                <img src={image} alt={name} className="mr-4"/>
                <p>{name}</p>

                <div className="ml-auto flex">
                    <button
                        className={`mr-2 p-2 border ${-1 === level ? "bg-green-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setLevel(-1)}
                    >
                        A
                    </button>

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
            {/*-1 이면 모두 보여주기*/}
            {
                level === -1 && Object.keys(allItems).map((key,index) => {
                        const item = allItems[key];
                        return (
                            <ItemAsset count={item.count} id={index} name={item.name} image={item.image}/>
                        );
                    })

            }
            {
                items[level] && <div className={"flex flex-col"}>
                    {
                        items[level].itemRequirements.map(
                            (i: any) => {
                                return <ItemAsset count={i.count} id={i.id} name={i.item.name} image={i.item.imageLink}
                                                  wiki={i.item.wikiLink}/>
                            }
                        )
                    }
                </div>
            }


        </div>
    );
}

export default Section;
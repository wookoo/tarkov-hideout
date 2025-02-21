interface ItemAssetProps {
    count: number
    image: string
    wiki: string
    name: string
}

const ItemAsset = ({count, image, wiki, name}: ItemAssetProps) => {
    return (

        <>
            <td className={"border border-b border-black min-w-20 max-w-20"}><img src={image}/></td>
            <td className={"border-b border-black px-3"}><a href={wiki}>{name}</a></td>
            <td className={"border-l border-r border-b border-black text-center w-16 px-3"}>{count}</td>
        </>
    );
}
export default ItemAsset;

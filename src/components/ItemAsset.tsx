interface ItemAssetProps {
    id: string
    count: number
    image: string
    wiki: string
    name: string
}

const ItemAsset = ({id, count, image, wiki, name}: ItemAssetProps) => {
    return <a className="flex items-center outline outline-1" href={wiki}>
        <img src={image} alt={name} className="mr-4 w-16"/>
        <p>{name} ({count})</p>
    </a>
}

export default ItemAsset;

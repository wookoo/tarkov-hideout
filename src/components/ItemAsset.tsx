interface ItemAssetProps {
    count: number
    image: string
    wiki: string
    name: string
}

const ItemAsset = ({ count, image, wiki, name }: ItemAssetProps) => {
    return (
        <a className="flex items-center border-l border-b border-r border-black" href={wiki}>
            <img src={image} alt={name} className="mr-4 w-16" />
            <p>{name}</p>
            {/* 오른쪽에 고정된 너비와 세로줄 추가 */}
            <div className="ml-auto w-32 px-1 text-center border-l border-black">
                {count}
            </div>
        </a>
    );
}
export default ItemAsset;

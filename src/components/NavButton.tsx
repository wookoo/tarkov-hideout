interface NavButtonProps {
    onClick: () => void
    flag: boolean
    text: string
}

const NavButton = ({onClick, flag, text}: NavButtonProps) => {
    return <button
        className={`px-1 rounded ${flag ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
        onClick={
            onClick
        }>{text}
    </button>
}

export default NavButton
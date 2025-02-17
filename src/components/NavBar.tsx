import useLanguageStore from "../stores/languageStore.ts";

export default function Navbar() {

    const {language,changeLanguage} = useLanguageStore();
    return (
        <nav className="max-w-7xl bg-gray-600 p-4 text-white flex">
            <div>{language ? "타르코프 하이드아웃 계산기" : "Tarkov Hideout Calculator"}</div>
            <div className="ml-auto">
                <label
                    className="inline-flex items-center me-5 cursor-pointer"
                    aria-label="Toggle Language">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={changeLanguage}
                        checked={language}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                    <span className="ms-3 text-sm font-medium">{language ? "한국어" : "English"}</span>
                </label>
            </div>
        </nav>
    );
}

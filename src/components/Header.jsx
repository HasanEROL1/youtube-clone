import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { IoIosSearch, IoIosVideocam } from "react-icons/io"
import { MdVideoLibrary } from "react-icons/md"
import { FaBell } from "react-icons/fa"

const Header = () => {
    const [params] = useSearchParams()
    const query = params.get("search_query")
    // use navigate kurulumu
    const navigate = useNavigate()
    // Form gönderildiğnde 
    const handleSubmit = (e) => {
        e.preventDefault();

        // inputa girilen değeri al
        const text = e.target[0].value

        // Arama sayfasına yönlendir
        navigate(`/results?search_query=${text}`)

    };
    return (
        <header className="px-2 py-[17px] sm:px-4 flex justify-between items-center">
            <Link to="/" className="flex gap-[6px]">
                <img src="/youtube.png" alt="youtube-logo" className="w-[41px] sm:w-12" />
                <h1 className="text-[21px] sm:text-2xl font-mono">Youtube</h1>
            </Link>

            <form
                onSubmit={handleSubmit}
                className="flex border border-gray-400 rounded-[20px]  overflow-hidden">
                <input

                    type="text"
                    placeholder="Ara"
                    className="bg-[#0f0f0f] text-white px-2 sm:px-5 py-1 sm:py-2 border border-transparent focus:border-blue-500 focus:outline-none rounded-l-[20px]"
                    defaultValue={query}
                />
                <button
                    type="submit"
                    className="px-3 sm:px-4 sm:text-2xl bg-zinc-800 hover:bg-zinc-600 transition duration-300" ><IoIosSearch /></button>

            </form>

            <div className="flex gap-3 text-xl cursor-pointer max-sm:hidden ">
                <FaBell className="hover:text-gray-400 transition" />
                <IoIosVideocam className="hover:text-gray-400 transition" />
                <MdVideoLibrary className="hover:text-gray-400 transition" />
            </div>


        </header >
    )
}

export default Header
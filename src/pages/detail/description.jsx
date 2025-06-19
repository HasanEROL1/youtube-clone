import millify from "millify"
import {
    useState,

} from "react"

const Description = ({ video }) => {

    const [isOpen, setIsOpen] = useState(false)



    const text = isOpen ? video.description : video.description.slice(0, 100) + "   ...Daha Fazlası"
    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="bg-secondary p-2 rounded-lg mt-4 cursor-pointer hover:bg-opacity-80">
            <div className=" flex gap-4 mb-2">
                <p>
                    {new Date(video.publishDate).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit"
                    })}
                </p>
            </div>
            <p className="whitespace-pre-wrap">{text}</p>
        </div>
    )
}

export default Description
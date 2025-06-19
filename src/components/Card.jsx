import millify from "millify"
import { useState } from "react"
import { Link } from "react-router-dom"

const Card = ({ item, isRow }) => {

    // mouse kardın üzerinde mi state'i
    const [isHover, setIsHover] = useState(false)

    if (item.type !== "video") return null

    // Kapak Fotoğrafı
    const thumbnail = item.thumbnail[item.thumbnail.length - 1].url

    // gifli kapak fotoğrafı
    const gif = item.richThumbnail && item.richThumbnail[0].url

    // Kanal Fotoğrafı
    const channelPic = item.channelThumbnail && item.channelThumbnail[0].url
    return (
        <Link to={`/watch?v=${item.videoId}`}
            className={isRow ? "row" : "col"}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >

            {/* Resim */}
            <div>
                <img src={isHover && gif ? gif : thumbnail} className="rounded-lg w-full h-full" />
            </div>
            {/*  Alt Detay */}
            <div className="flex gap-4">
                <img className="size-14 rounded-full pp" src={channelPic} />
                <div>
                    <h4 className="font-bold line-clamp-1">{item.title}</h4>

                    <p>{item.channelTitle}</p>

                    <div className="flex gap-3 items-center">
                        <p>
                            <span>{Number(item.viewCount) ? millify(Number(item.viewCount)) : "0"}</span>

                            <span className="text-sm ms-1 views ">Görüntülenme</span>
                        </p>
                        *
                        {item.isLive ? (
                            <p className="bg-red-500 py-0.5 px-2 rounded-lg">Canlı</p>) : (<p>{item.publishedTimeText}</p>

                        )
                        }


                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card
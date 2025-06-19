import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import api from "../../utils/api"
import ReactPlayer from "react-player"
import Channel from "./channel"
import Comments from "./comments"
import Description from "./description"
import Card from "../../components/Card"
import BasicLoader from "../../components/Basic-loader"
import Error from "../../components/Error"

const Detail = () => {

    const [video, setVideo] = useState(null)
    const [error, setError] = useState(null)

    // Arama parametrelerine erişim için kurulum
    const [params] = useSearchParams()

    // urldeki "v" isimli parametreye eriş
    const id = params.get("v")

    // id si bilinen videonun bilgilerini api'dan al
    useEffect(() => {
        const params = { id, extend: 1, geo: "TR", lang: "tr" }

        api
            .get("/video/info", { params })
            .then((res) => setVideo(res.data))
            .catch((err) => setError(err.message))
    }, [])
    return (
        <div className="detail-page h-screen overflow-auto">
            <div className="page-content">

                {/* Video İçeiği */}
                <div>
                    {/* Oynatıcı */}
                    <div className="h-[30vh] md:h-[50vh] lg:h-[60vh] rounded overflow-hidden">
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            controls
                            playing
                            width="100%"
                            height="100%" />
                    </div>
                    {error ? (<Error msg={error} />) : !video ? (<BasicLoader />) : (
                        <div>
                            {/* Başlık */}
                            <h1 className="my-3 text-xl font-bold">{video.title}</h1>

                            {/* Kanal Bilgileri */}
                            <Channel video={video} />
                            {/* Açıklama Alanı */}
                            <Description video={video} />
                            {/* Yorumlar */}
                            <Comments videoId={video.id} />
                        </div>
                    )}


                </div>

                {/* Önerilen Videolar */}
                <div
                    className="flex flex-col gap-5 p-1">
                    {video?.relatedVideos?.data?.length > 0 ? (
                        video.relatedVideos.data.map((item, key) => (
                            <Card key={key} item={item} isRow={true} />
                        ))
                    ) : (
                        <p className="mt-4 text-gray-500">İlgili video bulunamadı.</p>
                    )}

                </div>
            </div>
        </div>

    )
}







export default Detail
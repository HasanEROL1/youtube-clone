import { useEffect, useState } from "react"
import api from "../../utils/api"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import { TiArrowSortedDown } from "react-icons/ti"
const Comments = ({ videoId }) => {
    const [comments, setComments] = useState(null)
    const [error, setError] = useState(null)

    // Videonun yorumlarını api'dan al
    useEffect(() => {

        setComments(null) // önce sıfırla
        setError(null)    // hata varsa da temizle
        const params = {
            id: videoId,
            geo: "TR",
            lang: "tr"
        }

        api.get("/comments", {
            params: { id: videoId }
        })
            .then((res) => setComments(res.data))
            .catch((err) => setError(err.message))
    }, [videoId])

    return (
        <div className="my-6">
            {error ? (
                <p>Üzgünüz Yorumlar Alınamadı</p>
            ) : !comments ? (
                <p>Yorumlar Yükleniyor...</p>
            ) : comments.length === 0 ? (
                <p>Henüz herhangi bir yorum bulunmuyor</p>
            ) : (
                <div>
                    <h2 className="text-xl font-bold">{comments.commentsCount} Yorum</h2>

                    <input
                        type="text"
                        placeholder="Yorum Yaz..."
                        className="w-full bg-secondary p-2 rounded-lg mt-2 mb-4"
                    />
                    {comments.data.map((comment) => (
                        <div
                            key={comment.commentId}
                            className="flex gap-2 sm:gap-3 items-start px-1 py-3 sm:py-4"
                        >
                            <img src={comment.authorThumbnail[0].url}
                                className="rounded-full size-8 sm:size-10" />
                            <div className="flex flex-col gap-2">
                                <h5 className="flex gap-2 items-center">
                                    <span className="font-semibold ">{comment.authorText}</span>
                                    <span className="text-sm text-gray-500">{comment.publishedTimeText}</span>
                                </h5>

                                <p className="whitespace-pre-wrap">{comment.textDisplay}</p>

                                <div className="flex items-center gap-5">
                                    <button className="flex items-center gap-1 cursor-pointer hover:bg-secondary
                                     py-1 px-2 rounded">
                                        <AiOutlineLike />
                                        <span >{comment.likesCount}</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-secondary
                                     py-1 px-2 rounded ">
                                        <AiOutlineDislike />

                                    </button>
                                    {comment.replyCount > 0 && (
                                        <div className="flex items-center w-fit p-1 rounded cursor-pointer hover:bg-secondary text-blue-500">
                                            <TiArrowSortedDown />
                                            {comment.replyCount} Yanıt
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comments
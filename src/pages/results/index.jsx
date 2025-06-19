import { useSearchParams } from "react-router-dom"
import Card from "../../components/Card"
import { useEffect, useState } from "react"
import api from './../../utils/api';
import BasicLoader from './../../components/Basic-loader';
import Error from "../../components/Error"

const Results
    = () => {

        const [error, setError] = useState(null)
        const [data, setData] = useState([])
        const [token, setToken] = useState(null)
        const [isLoading, setIsLoading] = useState(true)
        const [page, setPage] = useState(1)
        // urldeki arama parametrelerini al
        const [params] = useSearchParams()
        const query = params.get("search_query")

        // api dan aratılan kelimeye uygun sonuçları al
        useEffect(() => {
            // api isteği atılmadan önce state'i true yap
            setIsLoading(true)
            // gönderilcek parametreleri ayarla
            const params = { query, token: page > 1 ? token : undefined }

            api
                .get("/search", { params })
                .then((res) => {
                    setData((prev) => [...prev, ...res.data.data])
                    setToken(res.data.continuation)

                })
                .catch((err) => setError(err.message))
                .finally(() => setIsLoading(false))
        }, [query, page])

        // yeni bir şey aratıldığında state'leri sıfırla
        useEffect(() => {
            setData([])
            setToken(null)
            setPage(1)
            setError(null)
        }, [query])



        return (
            <div className="p-4 sm:p-6 md:p-10 h-[93vh] overflow-y-auto">
                <h2 className="text-xl mb-5">
                    <span className="font-bold me-2">{query}</span>
                    <span>için sonuçlar</span>
                </h2>

                {error && <Error msg={error} />}

                <div className="wrapper flex flex-col gap-5 justify-center">
                    {data.map((item, key) => <Card key={key} item={item} isRow={true} />)}
                </div>
                {isLoading && <BasicLoader />}
                <div className="flex justify-center my-10">
                    {!isLoading && (
                        <button className="bg-secondary py-2 px-5 rounded md:hover:bg-zinc-800 transition"
                            onClick={() => setPage(page + 1)}
                        >
                            Daha Fazla
                        </button>
                    )}
                </div>
            </div>
        )
    }

export default Results

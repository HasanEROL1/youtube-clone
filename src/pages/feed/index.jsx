import { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import api from '../../utils/api';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import Card from '../../components/Card';


const Feed = () => {
    const [videos, setVideos] = useState(null)
    const [error, setError] = useState(null)

    const [params] = useSearchParams()
    const selected = params.get("category")
    useEffect(() => {
        setVideos(null)

        const url = !selected ? "/home" : selected === "trending" ? "/trending" : `/search?query=${selected}`

        api
            .get(url, { params: { geo: "TR", lang: "tr" } })
            .then((res) => setVideos(res.data.data))
            .catch((err) => setError(err.message))
    }, [selected]);



    return (
        <div className="flex">
            <Sidebar />
            <div className="videos">
                {error ? (<Error msg={error} />) : !videos ? (<Loader />) :
                    (videos.map((i, key) => <Card key={key} item={i} />))}

            </div>
        </div>
    )
}

export default Feed
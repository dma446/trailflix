import React, { useState, useEffect } from 'react'
import axios from './axios';
import requests, {API_KEY} from './requests';
import YouTube from 'react-youtube';
import "./Banner.css";

function Banner() {
    const [show, setShow] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {  
            const request = await axios.get(requests.fetchNetflixOriginals);
            setShow(
            request.data.results[Math.floor(Math.random() * request.data.results.length)]
            );
            return request;
        }
        fetchData();   
    }, []);
    
    /**function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }*/

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    };
    const handleClick = (show) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            axios.get(`/tv/${show?.id}/videos?api_key=${API_KEY}`)
            .then((video) => {
                const videos = video.data.results;
                const url = videos[videos.length-1].key;
                setTrailerUrl(url);
            })
            .catch((error) => console.log(error));
        }
    };
    
    const removeVideo = () => {
        if (trailerUrl) {
            setTrailerUrl("");
        }
    };

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${show?.backdrop_path}"
                )`,
                backgroundPosition: "center center",
            }} onClick={() => removeVideo()}>
            <div className="banner__video">
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
            <div className="banner__contents">
                <h1 className="banner__title">{show?.title || show?.name || show?.original_name}</h1>
                <div className="banner__buttons">
                    <button onClick={() => handleClick(show)} className="banner__button">Play Trailer</button>
                </div>
            <h1 className="banner__description">{show?.overview}</h1>

            </div>
            <div className="banner--fadeBottom" />
        </header>
    );
}

export default Banner

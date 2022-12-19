import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import { API_KEY } from './requests';
import YouTube from "react-youtube";

const base_url  = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [shows, setShows] = useState([]);
    const [tooltip, showTooltip] = useState("");
    const [trailerUrl, setTrailerUrl] = useState("");

    const onMouseEnter = (show) => {
        showTooltip(`${show?.title || show?.name}\n${show?.overview}`)
    };

    const onMouseLeave = () => {
        showTooltip("");
    }

    //A snippet of code which runs based on a specific condition/variable
     useEffect(() => {
        // if brackets blank, run once when the row loads and don't run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setShows(request.data.results);
            return request;
        }
        fetchData();
     }, [fetchUrl]); //<-- Any variable inside a useEffect needs to be put inside this bracket
     
     const opts = {
         height: "390",
         width: "100%",
         playerVars: {
             // https://developers.google.com/youtube/player_parameters
             autoplay: 1,
         },
     };

    const handleClick = (show) => {
       if (trailerUrl) {
            setTrailerUrl("");
        } else {
            console.log(show.title);
            const media_type = (show?.hasOwnProperty('release_date')) ? "movie" : "tv";
            axios.get(`/${media_type}/${show?.id}/videos?api_key=${API_KEY}`)
            .then((video) => {
                const videos = video.data.results;
                const url = videos[0].key;
                setTrailerUrl(url);
            })
            .catch((error) => console.log(error));
        }
    };

     return (
        <div className="row">
            <h2>{title}</h2>
            
            <div className="row__posters">
                {shows.map(show => (
                    <img
                    key={show.id}
                    onClick={() => handleClick(show)} 
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow ? show.poster_path : show.backdrop_path}`}
                    alt={show.title} onMouseEnter={() => onMouseEnter(show)} onMouseLeave={onMouseLeave}
                    />
                ))}
            </div>
            {tooltip}
           {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row

import React, { useState, useEffect } from 'react';
import './Row.css';
import {fetchShows, fetchVideo} from '..';
import YouTube from "react-youtube";

const base_url  = "https://image.tmdb.org/t/p/original/";

function Row({ title, category, isLargeRow }) {
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
        fetchShows(setShows, category);
     }, [category]); //<-- Any variable inside a useEffect needs to be put inside this bracket
     
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
            fetchVideo(show, setTrailerUrl);
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

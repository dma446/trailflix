import axios from "axios";

export function fetchVideo(show, func) {
    const mediaType = (show?.hasOwnProperty('release_date')) ? "movie": "tv";
    const options = {
        method: 'GET',
        url: 'http://localhost:8000/videos',
        params: {media_type: mediaType, id: show?.id}
    };
    console.log('url');

    axios.request(options)
    .then((video) => {
        const videos = video.data.results;
        const url = videos[videos.length-1].key;
        console.log(url);
        func(url);
    })
    .catch((error) => console.log(error));
}


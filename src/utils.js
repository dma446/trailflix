import axios from "axios";

export function fetchVideo(show, func) {
    const mediaType = (show?.hasOwnProperty('release_date')) ? "movie": "tv";
    const options = {
        method: 'GET',
        url: 'https://us-central1-trailfix-6b2d2.cloudfunctions.net/app/videos',
        params: {media_type: mediaType, id: show?.id}
    };

    axios.request(options)
    .then((video) => {
        const videos = video.data.results;
        const url = videos[videos.length-1].key;
        func(url);
    })
    .catch((error) => console.log(error));
}


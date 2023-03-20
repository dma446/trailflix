const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors())

const baseURL = "https://api.themoviedb.org/3";

app.get('/', (req, res) => {
    const category = req.query.category;

    const requests = {
        'trending': `${baseURL}/trending/all/week?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        'top_movies': `${baseURL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        'action_movies': `${baseURL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=28`,
        'comedy_movies': `${baseURL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=35`,
        'horror_movies': `${baseURL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=27`,
        'romance_movies': `${baseURL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=10749`,
        'documentaries': `${baseURL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=99`,
    }

    axios.get(requests[category]).then((response) => {
        res.json(response.data);
    });
});

app.get('/videos', (req, res) => {
    const mediaType = req.query.media_type;
    const showID = req.query.id;

    const options = {
        method: 'GET',
        url: `${baseURL}/${mediaType}/${showID}/videos?api_key=${process.env.TMDB_API_KEY}`,
    }
    axios.request(options).then((response) => {
        res.json(response.data);
    });
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
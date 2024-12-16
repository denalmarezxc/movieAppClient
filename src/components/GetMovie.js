import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../index.css'


export default function GetMovie(){
    const { id } = useParams();
    const [movie , setMovie] = useState({});

    const fetchDetails = () => {
        let fetchURL = `https://movieapp-api-lms1.onrender.com/movies/getMovie/${id}`;


        fetch(fetchURL)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        setMovie(data)
    })

    }

    
    useEffect(() => {
        fetchDetails();
    }, [])
    // console.log(movie.title)

    return(
        <>
            {/* <h1>GETMOVIE</h1> */}
            <div className="card movie-card shadow-sm rounded-lg">
                <div className="card-body d-flex flex-column flex-md-row gap-4">
                    {/* Movie Image */}
                    <div className="movie-img flex-shrink-0">
                    <img
                        className="movie-image img-fluid rounded-lg"
                        src="https://img.freepik.com/free-photo/collage-about-movie-time-with-popcorn_23-2149946322.jpg?t=st=1734360988~exp=1734364588~hmac=df3f12a08e75b4b6ffb8405675430e9b0f0505301beea460e2a4fbb5619f5acb&w=740"
                        alt="Movie Poster"
                    />
                    </div>

                    {/* Movie Description */}
                    <div className="movie-desc flex-grow-1">
                    <h1 className="movie-title text-primary mb-3">{movie.title}</h1>
                    <h2 className="text-muted mb-3">Director: {movie.director}</h2>
                    <h3 className="text-muted mb-3">Year: {movie.year} | Genre: {movie.genre}</h3>
                    <p className="movie-description">{movie.description}</p>
                    </div>
                </div>
            </div>
            

        </>

    )
}
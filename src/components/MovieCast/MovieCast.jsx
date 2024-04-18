import { useState, useEffect, useId } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/api";
import { nanoid } from 'nanoid'

const MovieCast = () => {
    const [movieCast, setMovieCast] = useState([]);
    const { movieId } = useParams();
    const castId=nanoid()
const loadMovieById = async (movieId) => {
        try {
            const movies = await fetchMovieCast(movieId);
            const cast = movies.data.cast;
            setMovieCast(cast);
        } catch(error) {
            console.log(error);
        }
    };

    const loadFun = () => {
        return loadMovieById(movieId);
    };

    useEffect(() => {
        loadFun();
    }, []);
    console.log(movieCast)
    return (
        <ul>
            {movieCast.map((cast) => {
                return (
                    <li key={cast.id}>
                        <img src={"https://image.tmdb.org/t/p/w200" + cast.poster_path} alt="poster" />
                    <p>Name: {cast.name}</p>
                    <p>Character: {cast.character}</p>
                </li>
                ) 
            })}
        </ul>
    )
}
export default MovieCast;
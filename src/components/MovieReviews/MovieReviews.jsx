import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/api";
import MovieReviewsItem from "../MovieReviewsItem/MovieReviewsItem";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
    const [movieReviews, setMovieReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { movieId } = useParams();  

    useEffect(() => {
         setLoading(true);
        const loadMovieById = async () => {
        try {
            const movies = await fetchMovieReviews(movieId);
            const review = movies.data.results;
            setMovieReviews(review);
        } catch(error) {
            setIsError(true);
            }
            finally {
            setLoading(false);
        }
    };
loadMovieById()
    }, [movieId]);
   
    return (
        <>
             <MovieReviewsItem review={movieReviews} />
         {loading && <Loader />}
            {isError && <ErrorMessage/>}
        </>
    )
}
export default MovieReviews;
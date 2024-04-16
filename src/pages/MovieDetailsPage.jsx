import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetailsPage = ({loadMovieById}) => {

    const { movieId } = useParams();
    try {
        loadMovieById(movieId)
    }
    catch(error) {
        console.log(error)
    }     

    return (
        <p>MovieDetailsPage {movieId }</p>
    )
}
export default MovieDetailsPage;
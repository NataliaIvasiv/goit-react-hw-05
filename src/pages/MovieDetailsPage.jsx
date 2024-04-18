import { useEffect, useState } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from '../api/api';
import css from './css/MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const [movieDetails, setMovieDetails] = useState({});
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkHref = location.state ?? "/";
    
    const loadMovieById = async (movieId) => {
        try {
            const movies = await fetchMovieDetails(movieId);
            const details = movies.data;
            setMovieDetails(details);
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
    
    const url = `https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`;
    
    return (
        <div className={css.detailsContainer}>
            <Link to={backLinkHref}>Go back</Link>
            <div className={css.imgContainer}><img src={url} alt="poster" /></div>
            <div className={css.sideContainer}>
                <h1 className={css.title}>{movieDetails.title}</h1>
                <p className={css.movieDetParagr}>genres: {movieDetails.genres && movieDetails.genres.map((genre) => { return genre.name   })}</p>
                <p className={css.movieDetParagr}>overview:</p>
                
                <p className={css.movieDetParagrSmall}>{movieDetails.overview}</p>
                <p className={css.movieDetParagr}>user score: { movieDetails.vote_average}</p>
                <div className={css.castContainer}>
                <p className={css.movieDetParagr}>Additional information</p>

                    <p><Link to='cast'>Cast</Link></p>
                <p><Link to='reviews'>Reviews</Link></p>
                    
                </div>
                
                <Outlet />
            </div>
        </div>
    );
};

export default MovieDetailsPage;
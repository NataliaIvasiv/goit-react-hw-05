import { NavLink,useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ trendList }) => {
    const location = useLocation();

    
    return (
        <ul className={css.MovieList}>
            {trendList.map((movie) => {
                return (
                    <li className={css.MovieListItem} key={movie.id}>
                        <NavLink to={`/movies/${movie.id}`} state={location}>                            
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="poster" />
                            {movie.title}</NavLink>
                    </li>
                );
            })}
        </ul>
    );
};

export default MovieList;
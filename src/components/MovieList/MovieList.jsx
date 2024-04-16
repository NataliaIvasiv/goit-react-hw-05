import { NavLink } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ trendList}) => {
    return (
        <ul className={css.MovieList}>
            {trendList.map((movie) => {
                return (
                    <li className={css.MovieListItem} key={movie.id}>
                        <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
                    </li>
                );
            })}
        </ul>
    );
};

export default MovieList;
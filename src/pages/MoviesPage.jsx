import toast from 'react-hot-toast';
import css from './css/MoviesPage.module.css'
import MovieList from '../components/MovieList/MovieList';
import { fetchSearchMovie } from '../api/api'
import { useState } from 'react';
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";

const MoviesPage = () => {
    const [listSearchMovies, setListSearchMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const loadSearchMovie = async (searchValue) => {
        setLoading(true);
   
        try {
            const movies = await fetchSearchMovie(searchValue);
            const listSearchMovies = movies.data.results;
            setListSearchMovies(listSearchMovies);
            if (!(listSearchMovies.length > 0)) {
            toast.error('there is no movie with such key word. Please type another query')
        }
      
        } catch {
            setIsError(true)
            console.log('error')
        }
        finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchValue = form.elements.search.value.trim();
        if (!searchValue) {
            toast.error('You should add your query. What movie would you like to see? ');
            form.reset();
            return
        }
       
            loadSearchMovie(searchValue);
        
            form.reset();
        }
    
        return (
            <div className={css.MoviesPageContainer}>
                <form className={css.MoviesPageForm} onSubmit={handleSubmit}>
                    <input className={css.MoviesPageInput} name='search'
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search movies"
                    />
                    <button type="submit" className={css.searchBarButton}>Search</button>
                </form>
                <MovieList trendList={listSearchMovies} />
                {loading && <Loader />}
                {isError && <ErrorMessage />}
            </div>
        )
    }

export default MoviesPage;
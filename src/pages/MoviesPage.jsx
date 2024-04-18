import toast from 'react-hot-toast';
import css from './css/MoviesPage.module.css'
import MovieList from '../components/MovieList/MovieList';
import { fetchSearchMovie } from '../api/api'
import { useState, useEffect } from 'react';

const MoviesPage = () => {
    const [listSearchMovies, setListSearchMovies] = useState([]);
const loadSearchMovie = async (searchValue) => {
        try {
            const movies = await fetchSearchMovie(searchValue);
            const listSearchMovies = movies.data.results;
            setListSearchMovies(listSearchMovies);
        } catch {
            // setIsError(true)
            console.log('error')
        }
        finally {
            // setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchValue = form.elements.search.value.trim();
         if (!searchValue) {
    toast.error('You should add your query. What movie would you like to see? ')
       return;
     }
        loadSearchMovie(searchValue);
        form.reset();
    }
    
    return (
        <div className={css.MoviesPageContainer}>
        <form className={css.MoviesPageForm}  onSubmit={handleSubmit}>
    <input className={css.MoviesPageInput} name='search'
      type="text"
      autoComplete="off"
      autoFocus
            placeholder="Search movies"
    />
    <button type="submit" className={css.searchBarButton}>Search</button>
            </form>

<MovieList trendList = {listSearchMovies} />
            </div>
    )
}
export default MoviesPage;
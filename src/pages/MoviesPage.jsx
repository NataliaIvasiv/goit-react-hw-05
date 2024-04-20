import toast from 'react-hot-toast';
import css from './css/MoviesPage.module.css'
import MovieList from '../components/MovieList/MovieList';
import { fetchSearchMovie } from '../api/api'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams('');
    const [listSearchMovies, setListSearchMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const searchValue = searchParams.get('value') ?? "";



    useEffect(() => {
        if (searchValue === "") return;
        const loadSearchMovie = async () => {
            setLoading(true);
            try {
                console.log(searchValue)
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
        loadSearchMovie();
        
    }, [searchValue]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const typingValue = form.elements.name.value.trim();
        setSearchParams({value: typingValue});
            form.reset();
        }
    
        return (
            <div className={css.MoviesPageContainer}>
                <form className={css.MoviesPageForm} onSubmit={handleSubmit}>
                    <input className={css.MoviesPageInput} name='name'
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
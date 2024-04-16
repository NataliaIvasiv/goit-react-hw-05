import { useState, useEffect } from "react";
import clsx from 'clsx';
import {fetchTrendingMovies, fetchMovieCast, fetchMovieDetails, fetchMovieReviews, fetchSearchMovie} from "./api/api";
import HomePage from "./pages/HomePage";
import { Route, Routes, NavLink } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import NotFoundPage from "./pages/NotFoundPage";
import Navigation from "./components/Navigation/Navigation";
import css from './App.module.css'


const App = () => {
    const [trendMovies, setTrendMovies] = useState([]);
    const [listSearchMovies, setListSearchMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);

    const loadTrendMovies = async () => {
        try {
            const movies = await fetchTrendingMovies();
            const trendList = movies.data.results;
            console.log(trendList)
            setTrendMovies(trendList);
        } catch {
            // setIsError(true)
            console.log('error')
        }
        finally {
            // setLoading(false);
        }
    }
    useEffect(() => loadTrendMovies, []);
 
     
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

       const loadMovieById = async (movieId) => {
        try {
            
            const movies = await fetchMovieDetails(movieId);
            const movieDetails = movies.data;
            
            setMovieDetails(movieDetails);
           

        }
        catch(error) {
            console.log(error)
        }
    }
   
    
    return (
        <div>
            <header>
                
                <Navigation />
                <Toaster toastOptions={{
                className: '',
                error:{style: {
        
        border: '1px solid #713200',
        fontWeight: '500',
        fontSize: '20px',
      padding: '16px',
        color: 'red',
        background: 'grey'},
                },
  }}/>
            </header>
    <section>
            
            
            <Routes>
                <Route path="/" element={<HomePage trendList={trendMovies}/>} />
                    <Route path="/movies" element={<MoviesPage loadSearchMovie={loadSearchMovie} listSearchMovies={listSearchMovies } />}/>
                    <Route path="/movies/:movieId" element={<MovieDetailsPage loadMovieById={loadMovieById } />}>
                            <Route path="cast" element={<MovieCast />} />
                            <Route path="reviews" element={<MovieReviews />}/>
                        </Route> 
               <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </section>
        </div>
    )
    
};
export default App;
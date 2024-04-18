import { useState, useEffect } from "react";
import clsx from 'clsx';
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
                <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />}/>
                    <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
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
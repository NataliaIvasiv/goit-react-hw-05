import { Suspense, lazy } from "react";

import HomePage from "./pages/HomePage";
import { Route, Routes} from "react-router-dom";
import  { Toaster } from 'react-hot-toast';
import Navigation from "./components/Navigation/Navigation";

const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));


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
            
             <Suspense fallback={<div>Loading page...</div>}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />}/>
                    <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                            <Route path="cast" element={<MovieCast />} />
                            <Route path="reviews" element={<MovieReviews />}/>
                        </Route> 
               <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    </Suspense>
            </section>
        </div>
    )
    
};
export default App;
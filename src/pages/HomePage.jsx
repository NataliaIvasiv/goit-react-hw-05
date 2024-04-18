import MovieList from "../components/MovieList/MovieList";
import { fetchTrendingMovies } from '../api/api'
import { useState, useEffect } from "react";

const HomePage = () => {
    const [trendMovies, setTrendMovies] = useState([]);
    const loadTrendMovies = async () => {
        try {
            const movies = await fetchTrendingMovies();
            const trendList = movies.data.results;
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
    return (
        <MovieList trendList={trendMovies} />
    )

}
export default HomePage;
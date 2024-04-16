import MovieList from "../components/MovieList/MovieList";
const HomePage = ({trendList, onClick}) => {
    return (
        <MovieList trendList={trendList} onClick={onClick}/>
    )

}
export default HomePage;
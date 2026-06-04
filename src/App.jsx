import { useState, useEffect } from "react";
import Header from "./components/Header";
import Movie from "./components/Movie";
import SearchBar from "./components/SearchBar";
import { FaFilm } from "react-icons/fa6";

function App() {
  const [allSearchedMovies, setAllSearchedMovies] = useState([]);
  const [detailedMovieList, setDetailedMovieList] = useState([]);
  const [movieSearchQuery, setMovieSearchQuery] = useState();
  const [watchList, setWatchList] = useState([]);
  const [pageSwitch, setPageSwitch] = useState(true);

  const apiString = import.meta.env.VITE_OMDB_API_URL;

  useEffect(() => {
    movieSearchQuery != undefined &&
      fetch(`${apiString}&s=${movieSearchQuery}`)
        .then((res) => res.json())
        .then((data) => setAllSearchedMovies(data.Search));
  }, [movieSearchQuery]);

  useEffect(() => {
    setDetailedMovieList([]);
    allSearchedMovies.map((movie) => {
      fetch(`${apiString}&plot=full&i=${movie.imdbID}`)
        .then((res) => res.json())
        .then((data) => {
          setDetailedMovieList((prev) => [...prev, data]);
        });
    });
  }, [allSearchedMovies]);

  function packUrl(formData) {
    setMovieSearchQuery(formData.get("searchBar").replace(/\s/g, "+"));
  }

  function addToWatchList(id) {
    detailedMovieList.map((movie) => {
      if (movie.imdbID === id) {
        setWatchList((prev) => [...prev, movie]);
      }
    });
  }

  const movieListElements = detailedMovieList.map((movie) => (
    <>
      <Movie movie={movie} addToWatchList={addToWatchList} />
      <hr />
    </>
  ));
  const watchListElements = watchList.map((movie) => (
    <>
      <Movie movie={movie} addToWatchList={addToWatchList} />
      <hr />
    </>
  ));

  const movieElements = (
    <>
      {pageSwitch === false ? (
        watchListElements.length === 0 ? (
          <h1>You have not added any movies</h1>
        ) : (
          watchListElements
        )
      ) : movieListElements.length !== 0 ? (
        movieListElements
      ) : (
        <>
          <FaFilm size="90px" color="#2E2E2F" />
          <p className="empty-search">Start Exploring</p>
        </>
      )}
    </>
  );

  return (
    <>
      <Header setPageSwitch={setPageSwitch} pageSwitch={pageSwitch} />
      {pageSwitch && <SearchBar packUrl={packUrl} />}
      <main className="movie-search-results">{movieElements}</main>
    </>
  );
}

export default App;

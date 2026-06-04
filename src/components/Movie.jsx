import '../movie.css'
import { FaStar } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";

export default function Movie(props) {
    
    return (
        <article className="movie-article">
            <img src={props.movie.Poster}/>
            <main>
                <header className="movie-header">
                    <h3>{props.movie.Title}</h3>
                    <FaStar className="rating-star" color="yellow"/>
                    <p>{props.movie.imdbRating}</p>
                </header>
                <section className="movie-information">
                    <p>{props.movie.Runtime}</p>
                    <p>{props.movie.Genre}</p>
                    <button onClick={()=>props.addToWatchList(props.movie.imdbID)}>
                        <IoMdAddCircle size="18px" />
                        WatchList
                    </button>
                </section>
                <section className='movie-description'>
                    <p>{props.movie.Plot}</p>
                </section>
            </main>
        </article>
    )
}
import moviePoster from '../assets/moviePosters.jpg'
export default function Header(props) {
    function handleClick(){
        props.setPageSwitch(prev => !prev)
        console.log("This happened!")
    }
    return (
        <header className='main-header'>
            <img src={moviePoster}/>
            <div className='header-content'>
                <h1>{props.pageSwitch ? 'Find your film' : 'My Watchlist'}</h1>
                <button onClick={handleClick}>{!props.pageSwitch ? 'Search for movies' : 'My Watchlist'}</button>
            </div>
        </header>
    )
}
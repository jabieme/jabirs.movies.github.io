import { IoIosSearch } from "react-icons/io";

export default function SearchBar(props) {
    return(
        <form action={props.packUrl}>
            <label htmlFor="searchBar"><IoIosSearch size="25px" color="#9CA3AF"/></label>
            <input name="searchBar" id="searchBar"/>
            <button>Search</button>
        </form>
    )
}
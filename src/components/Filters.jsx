import './Filters.css'

import { useContext, useId, useRef } from "react"
import { FiltersProvider } from "../contexts/filters"
import { useFilters } from "../hooks/useFilters"

export const Filters = () => {
    
    const { filters, setFilters } = useContext(FiltersProvider)
    const { uniqueGenres } = useFilters()
   
    const searchID = useId()
    const genresID = useId()
    const pagesRange = useId()

    const currenSearch = useRef(filters.bookName)

    // console.log('Renderizado Filters')

    const handleGenreChange = (event) => {
        console.log(event.target.value)
        setFilters(prevState => ({
            ...prevState,         
            genre: event.target.value
            
        }))
    }

    const handlePagesChange = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPages: event.target.value
        }))
    }

    const handleSearchChange = (event) => {
        currenSearch.current = event.target.value
        setFilters(prevState => ({
            ...prevState,
            bookName: currenSearch.current
        }))
    }


    return (
        <section>
            <div>
                <h4>Buscar libro:</h4>
                <input type="text" onChange={handleSearchChange} id={searchID} placeholder="Harry Potter, El Señor de los Anillos..."/>
            </div>
            <div>
                <h4>Search Filters</h4>
                <div className="filters">
                    <div className='filtro'>
                        <h5>Categoría</h5>
                        <select name="genres" id={genresID} onChange={handleGenreChange}>
                            <option value="All">Todos</option>
                            {
                                uniqueGenres.map((genre, index) => (
                                    <option key={index} value={genre}>{genre}</option>
                                )) 
                            }
                        </select>
                    </div>
                    <div className='filtro'>
                        <h5>Cantidad de páginas</h5>
                        <div className='pages'>
                            <p>{filters.minPages}</p>
                            <input type="range" onChange={handlePagesChange} name="pages" id={pagesRange} min="0" max="1400"/>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
import { createContext, useState } from "react";

export const FiltersProvider = createContext()

export const FiltersContext = ({children}) => {


    const [ filters, setFilters ] = useState({
        bookName: '',
        genre: 'All',
        minPages: 0
    })

    

    return(
        <FiltersProvider.Provider value={{ filters, setFilters }}>
            {children}
        </FiltersProvider.Provider>
    )
}

import { BooksContext } from '../contexts/books'
import { FiltersProvider } from '../contexts/filters'
import { useContext, useCallback } from 'react'


export const useFilters = () => {

    const {books}  = useContext(BooksContext)
    const {filters, setFilters } = useContext(FiltersProvider)

    // console.log(filters.minPages)
    const uniqueGenres = [...new Set(books.map(book => book.book.genre))]

    const filterBooks = useCallback((books) => {
        return books.filter(book => 
            (book.book.genre === filters.genre || filters.genre === 'All') && book.book.pages >= filters.minPages 
            && book.book.title.toLowerCase().includes(filters.bookName.toLowerCase())
        )
    }, [filters])

    return {filters, setFilters, uniqueGenres, filterBooks}
}
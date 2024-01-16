import { useContext } from 'react'
import { BooksContext } from '../contexts/books'

export const useBooks = () => {
    
    const context = useContext(BooksContext)

    if(context === undefined){
        throw new Error('No provider available')
    }
    return context
}
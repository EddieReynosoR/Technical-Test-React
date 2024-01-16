import { createContext, useReducer } from "react";
import { reducer, reducer2, listaLibros, listaLibrosLectura } from "../reducers/booksReducer";

export const BooksContext = createContext()


export const BookContext = ({children}) => {

    const [state, dispatch] = useReducer(reducer, listaLibros)
    const [state2, dispatch2] = useReducer(reducer2, listaLibrosLectura)

    const insertAvailableBook = item => dispatch({
        type: 'insertAvailableBooks', 
        payload: item
    })

    const removeAvailableBook = item => dispatch({
        type: 'removeAvailableBooks', 
        payload: item
    })

    const insertBookToRead = item => {
        //console.log(item)
        dispatch2({
        type: 'insertReadBooks',
        payload: item
    })}

    const removeBookToRead = item => dispatch2({
        type: 'removeReadBooks',
        payload: item
    })


    const updateAvailableBooks = books => dispatch({
        type: 'updateAvailableBooks',
        payload: books
    })

    const updateReadBooks = books => dispatch2({
        type: 'updateReadBooks',
        payload: books
    })



    const addRead = (item) => {
        insertBookToRead(item)
        removeAvailableBook(item)
    }

    const removeRead = (item) => {
        const {priority, ...book} = item.book
        const updatedItem = { 
            book: {
                ...book
            }
        }
        removeBookToRead(updatedItem)
        insertAvailableBook(updatedItem)
    }
    
    

    return(
        <BooksContext.Provider value={{books: state, listaLectura: state2, addRead, removeRead, updateAvailableBooks, updateReadBooks}}>
            {children}
        </BooksContext.Provider>
    )
}
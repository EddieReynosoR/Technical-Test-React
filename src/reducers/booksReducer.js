import {library} from '../mocks/books.json'


export const listaLibros =  JSON.parse(localStorage.getItem('listAvailableBooks')) || library
export const listaLibrosLectura = JSON.parse(localStorage.getItem('listReadBooks')) || []


export const updateListRead = (book) => {
    localStorage.setItem('listReadBooks', JSON.stringify(book))
}
export const updateListBooks = (book) => {
    localStorage.setItem('listAvailableBooks', JSON.stringify(book))
}

export function reducer(state, action) {
    const book  = action.payload
    switch(action.type){
        case 'insertAvailableBooks':{
            const bookInList = state.filter(item => item.book.ISBN === book.book.ISBN)

            if(bookInList.length > 0) {
                alert('Book already in list')

                return
            }

            const newState = [
                
                {
                    ...book
                },
                ...state
            ]

            updateListBooks(newState)


            return newState
               

        }
        case 'removeAvailableBooks': {
            const newState = state.filter(item => item.book.ISBN !== book.book.ISBN)
            //console.log(newState)
            updateListBooks(newState)

            return newState
        }
        case 'updateAvailableBooks':{
            const books = action.payload
            updateListBooks(books)
            return books
        }
    }
}



export function reducer2(state, action) {
    const book = action.payload
    switch(action.type){
        case 'insertReadBooks':{
            const bookInList = state.filter(item => item.book.ISBN === book.book.ISBN)

            if(bookInList.length > 0) {
                alert('Book already in list')

                return
            }

            const newState = [
                ...state, 
                {
                    ...book
                }
            ]

            updateListRead(newState)


            return newState
               

        }
        case 'removeReadBooks': {
            const newState = state.filter(item => item.book.ISBN !== book.book.ISBN)
            //console.log(newState)
            updateListRead(newState)

            return newState
        }
        case 'updateReadBooks':{
            const books = action.payload
            updateListRead(books)
            return books
        }
    }
}
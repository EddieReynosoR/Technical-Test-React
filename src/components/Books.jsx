import './Books.css'
import { useFilters } from '../hooks/useFilters'
import { useBooks } from '../hooks/useBooks'
import { useEffect, useMemo } from 'react'
import { Priority } from './Priority'
import { usePriority } from '../hooks/usePriority'

export const Books = () => {

  const {prioridad, book, setPrioridad, setBook} = usePriority()

  

  const {books, listaLectura, removeRead, updateAvailableBooks, updateReadBooks} = useBooks()

  //console.log(books)
  //console.log(listaLectura)

  // console.log('Renderizado Books')

  const {filters, filterBooks } = useFilters()

  // const filteredBooks = filterBooks(books)

  const filteredBooks = useMemo(()=> { return filterBooks(books)}, [filters, books])

  const onStorageUpdate = (e) =>{
    const {key, newValue } = e
    // console.log(key, JSON.parse(newValue))
    if(key==="listAvailableBooks"){
      updateAvailableBooks(JSON.parse(newValue))
    }
    else if(key==="listReadBooks"){
      updateReadBooks(JSON.parse(newValue))
    }
    
  }
  useEffect(() => {
    window.addEventListener("storage", onStorageUpdate)
    return () => {
      window.removeEventListener("storage", onStorageUpdate)
    }
  }, [])

  console.log(book)

  return(
    <section className='booksList-container'>
      {prioridad && <Priority />}
      <div>
        <h3>Libros disponibles ({filteredBooks.length})</h3>
        <div className='bookList-available'>
          {filteredBooks.length !== 0 ? (filteredBooks.map(item => {
            return(
              <div className="book-block" key={item.book.ISBN}>
                  <div className='book-data'>
                      <img src={item.book.cover} alt="Book Cover" />
                      <div className='book-info'>
                          <h3>{item.book.title}</h3>
                          <p>{item.book.author.name}</p>
                          <p>{item.book.year}</p>
                          <span>{item.book.pages}</span>
                      </div>
                  </div>
                  <div className='book-button'>
                      {book.book !== item.book ?<button onClick={() => {
                        setBook(item)
                        setPrioridad(true)
                        }}>Añadir a lista de lectura</button>
                        :
                        <button style={{background: '#424242', color: 'white'}} onClick={() => {
                          setBook({})
                          setPrioridad(false)
                        }}>Libro seleccionado</button>
                      }
                  </div>
              </div>
            )
          })) : (<p>No books finded...</p>)}
        </div>
      </div>
      <div>
        <h3>Lista de lectura ({listaLectura.length})</h3>
        <div className='bookList-read'>
          <div>
            {listaLectura.length !== 0 ? (listaLectura.sort((a,b) => {
              const orders = { 'Alta': 0, 'Media': 1, 'Baja': 2 };
              return orders[a.book.priority] - orders[b.book.priority];
              // return a.book.priority.localeCompare(b.book.priority)
            }).map(item => {
              return(
                <div className="book-block" key={item.book.ISBN}>
                    <div className='book-data'>
                        <img src={item.book.cover} alt="Book Cover" />
                        <div className='book-info'>
                            <h3>{item.book.title}</h3>
                            <h5>Prioridad: {item.book.priority}</h5>
                            <p>{item.book.author.name}</p>
                            <p>{item.book.year}</p>
                            <span>{item.book.pages}</span>
                        </div>
                    </div>
                    <div className='book-button'>
                        <button onClick={() => removeRead(item)}>Eliminar de la lista de lectura</button>
                    </div>
                </div>
              )
            })) : (<p>No hay libros en tu lista de lectura</p>)}
          </div>
        </div>
      </div>
    </section>
  )
}
import './Priority.css'
import { useId, useRef, useState, useEffect } from "react"
import { useBooks } from "../hooks/useBooks"
import { usePriority } from "../hooks/usePriority"


export const Priority = () => {
    const { setPrioridad, book } = usePriority()
    const priorityRef = useRef('Alta')
    const priorityID = useId()
    const { addRead } = useBooks()

    const [bookToRead, setBookToRead] = useState({
        book: {
            ...book.book,
            priority: priorityRef.current
        }
    })
    
    useEffect(()=>{
        setBookToRead({
            book: {
                ...book.book,
                priority: priorityRef.current
            }
        })
    }, [book])

    const handlePriorityChange = (event) => {
        priorityRef.current = event.target.value
        setBookToRead({
            book: {
                ...bookToRead.book,
                priority: priorityRef.current
            }
        })
    }

    const handlePrioritySubmit = () => {
        addRead(bookToRead);
        setPrioridad(false);
    }

    return(
        <div className="priority-form">
            <select name="priority" id={priorityID} onChange={handlePriorityChange}>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
            </select>
            <button onClick={handlePrioritySubmit}>Insertar</button>
        </div>
    )
}
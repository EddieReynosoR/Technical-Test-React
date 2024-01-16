import { createContext, useState } from "react";

export const PriorityProvider = createContext()

export const PriorityContext = ({children}) => {
    const [prioridad, setPrioridad] = useState(false)
    const [book, setBook] = useState({})
    

    console.log(book)

    
    return (
        <PriorityProvider.Provider value={{prioridad, setPrioridad, book, setBook}}>
            {children}
        </PriorityProvider.Provider>
    )
}
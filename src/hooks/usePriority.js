import { useState, useContext } from "react"
import { PriorityProvider } from "../contexts/priority"

export const usePriority = () => {

    const context = useContext(PriorityProvider)

    if(context === undefined){
        throw new Error('No provider available')
    }
    
    return context
}
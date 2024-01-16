import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BookContext } from './contexts/books.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BookContext>
    <App />
  </BookContext>
  
)

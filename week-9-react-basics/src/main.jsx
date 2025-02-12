// import { StrictMode } from 'react'   //this was causing issues in couter kind of things
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)

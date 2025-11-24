/**
 * Application Entry Point
 * 
 * This is the main entry file for the Vite + React application.
 * It mounts the React app to the DOM and enables StrictMode for
 * development warnings and checks.
 * 
 * @module main
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Mount the React application to the #root element in index.html
// StrictMode enables additional development checks (double-renders, etc.)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

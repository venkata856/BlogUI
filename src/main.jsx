// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routers from './Router.jsx'
import { AuthProvider } from './context/authProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(


    <AuthProvider><Routers /></AuthProvider>

   

)

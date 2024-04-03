import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StockPage from './routes/StockPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route index={true} path="/" element={<App />} />
<Route index={false} path="/:symbol" element={<StockPage/>}/>
    </Routes>
    </BrowserRouter>
    </React.StrictMode>,
)

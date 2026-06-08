import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AutContextProvider from './context/AutContext.jsx'
import {BrowserRouter} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AutContextProvider>
      <App />
    </AutContextProvider>
  </BrowserRouter>
  
  
)

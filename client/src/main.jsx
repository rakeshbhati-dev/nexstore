import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './contexts/UserContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Toaster  position='top-left' />
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { CourseContextProvider } from './context/CourseContext.jsx'

export const server = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
// In Vercel, you will add an Environment Variable: VITE_BACKEND_URL = https://your-render-app.onrender.com

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
          <App />
      </CourseContextProvider>
    </UserContextProvider>
  </StrictMode>,
)

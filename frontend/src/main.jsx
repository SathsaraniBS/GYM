// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import './App.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'           // ← THIS LINE WAS MISSING!
import './index.css'
import './App.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx' // ← your auth context

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
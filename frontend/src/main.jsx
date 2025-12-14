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
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';           // Correct import
import './index.css';
import './App.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Correct import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
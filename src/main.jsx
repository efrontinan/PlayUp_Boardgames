import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

import { BrowserRouter as Router } from 'react-router-dom'
import { AuthorProviderWrapper } from './contexts/auth.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthorProviderWrapper>
      <Router>
        <App />
      </Router>
    </AuthorProviderWrapper>
  </StrictMode>,
)

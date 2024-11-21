import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './animations.css'
import App from './App.jsx'

import { BrowserRouter as Router } from 'react-router-dom'
import { AuthorProviderWrapper } from './contexts/auth.context.jsx'
import { UserMessageProvidedWrapper } from "./contexts/userMessage.context"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserMessageProvidedWrapper>
        <AuthorProviderWrapper>
          <Router>
            <App />
          </Router>
        </AuthorProviderWrapper>
    </UserMessageProvidedWrapper>
  </StrictMode>
)

import './App.css'
import { Container, Nav, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppRoutes from './routes/AppRoutes'

import GameList from './components/GameList/GameList'


function App() {

  return (
    <div className="App">

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Frikis</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Juegos de mesa</Nav.Link>
            <Nav.Link href="#features">Nuevo juego</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <AppRoutes />

      <GameList />
    </div>
  )
}

export default App



import './App.css'
import {Container, Nav, Navbar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppRoutes from './routes/AppRoutes'
import { Link } from 'react-router-dom'


const App = () => {

  return (
    <div className="App">
      
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand to="/" as={Link} className='mr-5'> Frikis</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/juegos" as={Link}>Juegos de mesa</Nav.Link>
            <Nav.Link to="/juegos/nuevo" as={Link}>Nuevo juego</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <AppRoutes />

      </div>
  )
}

export default App



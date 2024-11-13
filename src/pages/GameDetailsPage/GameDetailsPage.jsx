import axios from "axios"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import { BreadcrumbItem, Col, Container, Row, Breadcrumb, ListGroup, Button } from "react-bootstrap"

import EventsList from "../../components/EventsList/EventsList"
import EventsForm from "../../components/EventsForm/EventsForm"


const API_URL = "http://localhost:5005"

const GameDetailsPage = () => {

  const { gameId } = useParams()

  const [game, setGame] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchGameDetails()
  }, [])

  const fetchGameDetails = () => {
    axios
      .get(`${API_URL}/games/${gameId}`)
      .then(response => {
        setGame(response.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  return (

    isLoading ? <h1>CARAGNDO</h1> :
      (
        <div className="GameDetailsPage">
          <Container>

            <Row >
              <Col md={{ span: 3 }}>
              <Button variant="light" as={Link} to="/juegos">Volver atrás</Button>
                <img src={game.image} alt="imagen de juego de mesa" />
              </Col>

              <Col md={{ span: 6 }}>

                <h1>{game.title}</h1>
                <hr />

                <Breadcrumb>
                  {
                    game.categories.map((elm) => {
                      return (
                        <BreadcrumbItem active="false" key={elm}>
                          {elm}
                        </BreadcrumbItem>
                      )
                    })
                  }
                </Breadcrumb>

                <p>{game.description}</p>

                <hr />

                <h2>Cómo jugar</h2>
                <ul>
                  {
                    game.howToPlay.map(elm => {
                      return (
                        <li key={elm}>
                          {elm}
                        </li>
                      )
                    })
                  }
                </ul>

                <hr />
                <h3>Contenido</h3>
                <ul>
                  {
                    game.content.map(elm => {
                      return (
                        <li key={elm}>
                          {elm}
                        </li>
                      )
                    })
                  }
                </ul>
              </Col>

              <Col md={{ span: 3 }}>
                <ListGroup>
                  <ListGroup.Item><h5>{game.specs.players.min}-{game.specs.players.max} jugadores</h5>
                  </ListGroup.Item>

                  <ListGroup.Item><p>Duración: {game.specs.duration} minutos</p>
                  </ListGroup.Item>

                  <ListGroup.Item><p>Edad mínima: {game.specs.minimumAge} años</p>
                  </ListGroup.Item>

                  <ListGroup.Item><p>{!game.oneTimePlay ?
                    "Se puede jugar varias veces"
                    :
                    "Solo se puede jugar una vez"}</p>
                  </ListGroup.Item>
                  <ListGroup.Item><h5>Expansiones:</h5>
                    {
                      !game.expansions || game.expansions[0] === "" ?
                        "Este juego no tiene expansiones"
                        :
                        <ul>
                          {
                            game.expansions.map(elm => {
                              return (
                                <li key={elm}>
                                  {elm}
                                </li>
                              )
                            })
                          }
                        </ul>
                    }</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>

            <EventsList gameId={gameId} />

            <h4>¿Quieres crear tu propia quedada?</h4>


            <EventsForm gameId={gameId} />

          </Container>

        </div>
      )

  )
}

export default GameDetailsPage
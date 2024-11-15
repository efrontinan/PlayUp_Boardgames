import "../GameDetailsPage/GameDetailsPage.css"

import axios from "axios"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import { Stack, Col, Container, Row, Badge, ListGroup, Button, Tabs, Tab } from "react-bootstrap"

import EventsList from "../../components/EventsList/EventsList"
import Loader from "../../components/Loader/Loader"

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

    isLoading ? <Loader /> :
      (
        <div className="GameDetailsPage">
          <Container>

            <Row >
              <Col md="3">
                <img src={game.image} alt="imagen de juego de mesa" />
              </Col>

              <Col md="6">

                <h1>{game.title}</h1>
                <hr />

                <Stack gap={1} className='float-left wrap'>
                  {game.categories.map((elm, idx) => {
                    return (
                      <Badge bg="badge-outline-primary" key={idx}>{elm}</Badge>
                    )
                  })}
                </Stack>

                <hr />
                <p>{game.description}</p>

                <Button variant="light" as={Link} to="/juegos">Volver atrás</Button>
              </Col>

              <Col md="3">
                <ListGroup className="short-specs-chart">
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
                </ListGroup>

              </Col>
            </Row>
            <Tabs
              defaultActiveKey="instructionsTab"
              id="fill-tab-example"
              className="mb-3"
              fill
            >

              <Tab eventKey="instructionsTab" title="Cómo jugar">
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
              </Tab>

              <Tab eventKey="contentTab" title="Contenido">
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
              </Tab>
              <Tab eventKey="expansionsTab" title="Expansiones">
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
                }
              </Tab>
              <Tab eventKey="eventsTab" title="Eventos">
                <EventsList />
              </Tab>
            </Tabs>


          </Container>


        </div>
      )

  )
}

export default GameDetailsPage
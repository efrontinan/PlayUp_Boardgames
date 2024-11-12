import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { BreadcrumbItem, Col, Container, Row, Breadcrumb } from "react-bootstrap"

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

            <Row>
              <Col md={{ span: 4 }}>
                <img src={game.image} alt="imagen de juego de mesa" />
              </Col>

              <Col md={{ span: 4 }}>

                <h1>{game.title}</h1>
                <hr />

                <Breadcrumb>
                  {
                    game.categories.map(elm => {
                      return (
                        <BreadcrumbItem active="false">
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
                        <li>
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
                        <li>
                          {elm}
                        </li>
                      )
                    })
                  }
                </ul>
              </Col>

              <Col md={{ span: 4 }}>

                <h5>{game.specs.players.min}-{game.specs.players.max} jugadores</h5>
                <p>Duración: {game.specs.duration} minutos</p>
                <p>Edad mínima: {game.specs.minimumAge} años</p>
                <p>{!game.oneTimePlay ?
                  "Se puede jugar varias veces"
                  :
                  "Solo se puede jugar una vez"}</p>
                <h5>Expansiones:</h5>
                {
                  !game.expansions ?
                    "Este juego no tiene expansiones"
                    :
                    <ul>
                      {
                        game.expansions.map(elm => {
                          return (
                            <li>
                              {elm}
                            </li>
                          )
                        })
                      }
                    </ul>
                }
              </Col>
            </Row>
          </Container>

        </div>
      )

  )
}

export default GameDetailsPage
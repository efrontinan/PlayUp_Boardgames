import "../GameDetailsPage/GameDetailsPage.css"

import axios from "axios"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import { Stack, Col, Container, Row, Badge, ListGroup, Button, Tabs, Tab, DropdownButton, Dropdown } from "react-bootstrap"
import { ChevronLeft } from "react-bootstrap-icons"

import EventsList from "../../components/EventsList/EventsList"
import Loader from "../../components/Loader/Loader"
import ReviewsList from "../../components/ReviewsList/ReviewsList"
import StarRatingItem from "../../components/StarRatingItem/StarRatingItem"

const API_URL = import.meta.env.VITE_APP_API_URL

const GameDetailsPage = () => {

  const { gameId } = useParams()

  const [game, setGame] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [ratingAverage, setAverageRating] = useState(0)
  const [activeKey, setActiveKey] = useState('instructionsTab')
  const [tabTitle, setTabTitle] = useState('')

  useEffect(() => {
    switch (activeKey) {
      case 'instructionsTab':
        setTabTitle('Cómo jugar')
        break
      case 'contentTab':
        setTabTitle('Contenido')
        break
      case 'expansionsTab':
        setTabTitle('Expansiones')
        break
      case 'eventsTab':
        setTabTitle('Planazos')
        break
      case 'reviewsTab':
        setTabTitle('Reviews')
        break
      default:
        setTabTitle('Cómo jugar')
    }
  }, [activeKey])

  useEffect(() => {
    fetchGameDetails()
    fetchReviewRating()
  }, [gameId])

  const fetchGameDetails = () => {
    axios
      .get(`${API_URL}/games/${gameId}`)
      .then(response => {
        setGame(response.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  const fetchReviewRating = () => {
    axios
      .get(`${API_URL}/reviews/?gameId=${gameId}`)
      .then(response => {
        calculateAverageRating(response.data)
      })
      .catch(err => console.log(err))
  }

  const calculateAverageRating = (reviews) => {
    if (reviews.length > 0) {
      const total = reviews.reduce((acc, elm) => acc + Number(elm.rating), 0);
      setAverageRating(total / reviews.length);
    } else {
      setAverageRating(0);
    }
  }

  return (

    isLoading ? <Loader /> :
      (
        <div className="GameDetailsPage m-3 m-md-5 text-pop-up-top">

          <Container className="full-height-min custom-col">

            <Row className="mb-2 mb-md-5 w-100 " >
              <Col md="3">
                <Button
                  variant="custom-transparent"
                  size="lg" as={Link}
                  to="/juegos"
                  className="mb-2">
                  <ChevronLeft /> Atrás
                </Button>

                <img src={game.image} alt="imagen de juego de mesa" />
              </Col>

              <Col md="6" className="px-0 px-md-5 mt-5">

                <Row>
                  <Col > <h1>{game.title}</h1></Col>
                  <Col className="text-end"><StarRatingItem rating={ratingAverage} /></Col>
                </Row>

                <Stack gap={2} className='float-left wrap my-3'>
                  {game.categories.map((elm, idx) => {
                    return (
                      <Badge bg="badge-outline-secondary" className="p-2 border-style" key={idx}>{elm}</Badge>
                    )
                  })}
                </Stack>

                <p>{game.description}</p>

              </Col>

              <Col md="3" className="my-3 mt-md-5 p-0">
                <ListGroup className="short-specs-chart h-100 justify-content-center p-2">
                  <ListGroup.Item><p>{game.specs.players.min}-{game.specs.players.max} jugadores</p>
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
            <div className="DropDown d-block d-md-none w-100">
              <DropdownButton
                variant="outline-secondary"
                title={tabTitle}
                className="my-3 w-100 d-md-none">
                <Dropdown.Item
                  eventKey="instructionsTab"
                  onClick={() => setActiveKey('instructionsTab')}>
                  Cómo jugar
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="contentTab"
                  onClick={() => setActiveKey("contentTab")}>
                  Contenido
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="expansionsTab"
                  onClick={() => setActiveKey("expansionsTab")}>
                  Expansiones
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="eventsTab"
                  onClick={() => setActiveKey("eventsTab")}>
                  Planazos
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="reviewsTab"
                  onClick={() => setActiveKey("reviewsTab")}>
                  Reviews
                </Dropdown.Item>

              </DropdownButton>
              <Tabs id="fill-tab-example"
                className="d-none d-md-none"
                fill
                activeKey={activeKey}>

                <Tab
                  eventKey="instructionsTab"
                  title="Cómo jugar"
                  className="w-100"
                  onSelect={() => setActiveKey('instructionsTab')}>

                  <ul className="my-3 my-md-5 text-pop-up-top">
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

                <Tab
                  eventKey="contentTab"
                  title="Contenido"
                  className="w-100"
                  onSelect={() => setActiveKey('contentTab')}>

                  <ul className="my-3 my-md-5 text-pop-up-top">
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

                <Tab
                  eventKey="expansionsTab"
                  title="Expansiones"
                  className="w-100"
                  onSelect={() => setActiveKey('expansionsTab')}>
                  {
                    !game.expansions || game.expansions[0] === "" ?
                      "Este juego no tiene expansiones"
                      :
                      <ul className="my-3 my-md-5 text-pop-up-top">
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

                <Tab
                  eventKey="eventsTab"
                  title="Planazos"
                  className="w-100"
                  onSelect={() => setActiveKey('eventsTab')}>
                  <EventsList />
                </Tab>

                <Tab
                  eventKey="reviewsTab"
                  title="Reviews"
                  className="w-100"
                  onSelect={() => setActiveKey('reviewsTab')}>
                  <ReviewsList />
                </Tab>

              </Tabs>

            </div>

            <div className="Tabs d-none d-md-block text-pop-up-top">
              <Tabs
                defaultActiveKey="instructionsTab"
                id="fill-tab-example"
                className="mb-3 mx-2"
                fill
              >

                <Tab
                  eventKey="instructionsTab"
                  title="Cómo jugar"
                  className="w-100"
                  onSelect={() => setActiveKey('instructionsTab')}>

                  <ul className="my-3 my-md-5 text-pop-up-top">
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

                <Tab
                  eventKey="contentTab"
                  title="Contenido"
                  className="w-100"
                  onSelect={() => setActiveKey('contentTab')}>

                  <ul className="my-3 my-md-5 text-pop-up-top">
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

                <Tab
                  eventKey="expansionsTab"
                  title="Expansiones"
                  className="w-100"
                  onSelect={() => setActiveKey('expansionsTab')}>
                  {
                    !game.expansions || game.expansions[0] === "" ?
                      "Este juego no tiene expansiones"
                      :
                      <ul className="my-3 my-md-5 text-pop-up-top">
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

                <Tab
                  eventKey="eventsTab"
                  title="Planazos"
                  className="w-100"
                  onSelect={() => setActiveKey('eventsTab')}>
                  <EventsList />
                </Tab>

                <Tab
                  eventKey="reviewsTab"
                  title="Reviews"
                  className="w-100"
                  onSelect={() => setActiveKey('reviewsTab')}>
                  <ReviewsList updateRating={fetchReviewRating} />
                </Tab>

              </Tabs>

            </div>

          </Container>

        </div>
      )

  )
}

export default GameDetailsPage
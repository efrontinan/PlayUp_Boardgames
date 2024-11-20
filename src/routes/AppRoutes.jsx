import { Routes, Route } from "react-router-dom"

import GameGalleryPage from "./../pages/GameGalleryPage/GameGalleryPage"
import HomePage from "./../pages/HomePage/HomePage"
import CreateGamePage from "./../pages/CreateGamePage/CreateGamePage"
import GameDetailsPage from "./../pages/GameDetailsPage/GameDetailsPage"
import EditGamePage from "./../pages/EditGamePage/EditGamePage"
import EditEventPage from "./../pages/EditEventPage/EditEventPage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import EventsGalleryPage from "../pages/EventsGalleryPage/EventsGalleryPage"
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage"
import ContactPage from "../pages/ContactPage/ContactPage"
import LoginPage from "../pages/LoginPage/LoginPage"

const AppRoutes = () => {
    return (
        <div className="AppRoutes">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/juegos" element={<GameGalleryPage />} />
                <Route path="/juegos/detalles/:gameId" element={<GameDetailsPage />} />
                <Route path="/planes" element={<EventsGalleryPage />} />
                <Route path="/sobre-nosotros" element={<AboutUsPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/iniciar-sesion" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}

export default AppRoutes
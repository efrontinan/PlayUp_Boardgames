import { Routes, Route } from "react-router-dom"

import GameGalleryPage from "./../pages/GameGalleryPage/GameGalleryPage"
import HomePage from "./../pages/HomePage/HomePage"
import CreateGamePage from "./../pages/CreateGamePage/CreateGamePage"
import GameDetailsPage from "./../pages/GameDetailsPage/GameDetailsPage"
import EditGamePage from "./../pages/EditGamePage/EditGamePage"
import EditEventPage from "./../pages/EditEventPage/EditEventPage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"

const AppRoutes = () => {
    return (
        <div className="AppRoutes">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/juegos" element={<GameGalleryPage />} />
                <Route path="/juegos/nuevo" element={<CreateGamePage />} />
                <Route path="/juegos/editar/:gameId" element={<EditGamePage />} />
                <Route path="/juegos/detalles/:gameId" element={<GameDetailsPage />} />
                <Route path="/eventos/editar/:eventId" element={<EditEventPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}

export default AppRoutes
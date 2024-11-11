import { Routes, Route } from "react-router-dom"

const AppRoutes = () => {
    return (
        <div className="AppRoutes">
            <Routes>
                <Route path="/" element={<h1>PRINCPAAAAL</h1>} />
                <Route path="/juegos" element={<h1>Pagina de juegos</h1>} />
                <Route path="/juegos/nuevo" element={<h1>Crear juego</h1>} />
                <Route path="/juegos/editar/:id" element={<h1>Editar juego</h1>} />
                <Route path="/juegos/detalles/:id" element={<h1>Detalles de juego y crear evento</h1>} />
                <Route path="/eventos/editar/:id" element={<h1>Editar evento</h1>} />
            </Routes>
        </div>
    )
}

export default AppRoutes
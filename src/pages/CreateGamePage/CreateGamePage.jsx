import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";

import GameForm from "../../components/GameForm/GameForm";

const CreateGamePage = () => {

    return (
        <div className="CreateGamePage">
            <GameForm />
            <Button variant="dark" as={Link} to={"/juegos"}>Volver a inicio</Button>
        </div>
    )
}

export default CreateGamePage
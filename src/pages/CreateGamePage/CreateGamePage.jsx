import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";

import CreateGameForm from "../../components/CreateGameForm/CreateGameForm";

const CreateGamePage = () => {

    return (
        <div className="CreateGamePage">
            <CreateGameForm />
            <Button variant="dark" as={Link} to={"/juegos"}>Volver a inicio</Button>
        </div>
    )
}

export default CreateGamePage
import { Button, Toast } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useContext } from "react"

import { UserMessageContext } from "../../contexts/userMessage.context"

import './UserMessage.css'


const UserMessage = () => {

    const { showMessage, setShowMessage, message, url } = useContext(UserMessageContext)

    return (
        <div className="UserMessage">
            <Toast
                show={showMessage}
                onClose={() => {
                    setShowMessage(false)
                }}
                autohide
                delay={'3000'}
                className="d-flex flex-row-reverse w-auto">

                <Toast.Header className="m-0"> </Toast.Header>
                
                <Toast.Body>
                    {message}
                    {url && (
                        <Button as={Link} to={url} variant="custom-text-light" className="ms-3">Ver detalles </Button>)}
                </Toast.Body>

            </Toast>
        </div>
    )

}

export default UserMessage
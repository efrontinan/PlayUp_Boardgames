import { Button, Toast } from "react-bootstrap"
import { UserMessageContext } from "../../contexts/userMessage.context"
import { useContext } from "react"
import { Link } from "react-router-dom"


const UserMessage = () => {

    const {showMessage, setShowMessage, message, url } = useContext(UserMessageContext)

    return (
        <Toast 
        show={showMessage} 
        onClose={() => {
            setShowMessage(false)
        }} 
        autohide 
        delay={'3000'}>
            <Toast.Header> </Toast.Header>
            <Toast.Body>
                {message}
                { url && (
                    <Button as={Link} to={url} >Ver detalles </Button>)}
            </Toast.Body>
        </Toast>
    )

}

export default UserMessage
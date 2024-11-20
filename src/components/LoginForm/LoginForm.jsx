import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"

import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const LoginForm = () => {

    const { login } = useContext(AuthContext)

    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmitForm = e => {
        e.preventDefault()

        const { username, password } = loginData

        if (username === "playupadmin" && password === "mejodieron123") {
            loginUser()
            navigate("/")
        }
        else {
            alert("datos incorrectos")
        }
    }

    const loginUser = () => {
        const user = "Administrador"
        login(user)
    }

    return (
        <div className="LoginForm">
            <Form onSubmit={handleSubmitForm} className="vertical-form p-3">

                <Form.Group controlId="authorField" className="mb-3">
                    <Form.Label>Nombre de Administrador</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Introduce tu nombre"
                        value={loginData.username}
                        onChange={handleInputChange}
                        name={'username'}
                    />
                    <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="contactField" className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Indícanos un email para apuntarse"
                        value={loginData.password}
                        onChange={handleInputChange}
                        name={'password'}
                    />
                    <Form.Control.Feedback type="invalid">Este campo es obligatorio</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Validar</Button>
            </Form>
        </div>
    )
}

export default LoginForm
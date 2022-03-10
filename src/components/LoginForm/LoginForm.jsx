import { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import authService from '../../services/auth.service'
import { MessageContext } from './../../context/userMessage.context'
import { AuthContext } from './../../context/auth.context'
import "./LoginForm.css"

function LoginForm() {

    const [loginForm, setLoginForm] = useState({
        password: "",
        email: ""
    })

    const navigate = useNavigate()

    const { setShowMessage, setMessageInfo } = useContext(MessageContext)
    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleInputChange = event => {
        const { name, value } = event.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    function handleSubmit(event, res) {
        event.preventDefault()

        authService
            .login(loginForm)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                setShowMessage(true)
                setMessageInfo({ title: 'Success', desc: 'Session successfully initiated' })
                navigate('/')
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: "Invalid data request" })
            })
    }

    return (

        <Form className="loginForm" onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control className="loginFormControl" type="email" name="email" value={loginForm.email} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control className="loginFormControl" type="password" name="password" value={loginForm.password} onChange={handleInputChange} />
            </Form.Group>

            <Button className="loginFormButton" type="submit" style={{ width: '100%' }}>Login</Button>

        </Form>
    )
}

export default LoginForm
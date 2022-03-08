import { useState, useContext } from "react"
import { Button, Form } from "react-bootstrap"
import authService from "../../services/auth.service"
import { MessageContext } from './../../context/userMessage.context'
import { useNavigate } from 'react-router-dom'
import uploadService from "../../services/upload.service"
import "./SignupForm.css"


function SignupForm() {

    const [signupForm, setSignupForm] = useState({
        username: "",
        password: "",
        email: "",
        imgProfile: ""
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const { setMessageInfo, setShowMessage } = useContext(MessageContext)

    const navigate = useNavigate()

    const handleInputChange = event => {
        const { name, value } = event.target
        setSignupForm({
            ...signupForm,
            [name]: value
        })
    }

    const uploadImage = e => {
        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append("imageData", e.target.files[0])

        uploadService
                .uploadImage(uploadData)
                .then(({ data }) => {
                    setLoadingImage(false)
                    setSignupForm({...signupForm, imgProfile: data.cloudinary_url})
                })
                .catch(err => console.log(err))
    }

    function handleSubmit(event, res) {

        event.preventDefault()

        authService
            .signup(signupForm)
            .then(({ data }) => {
                setShowMessage(true)
                setMessageInfo({ title: "Created", desc: "User created successfully" })
                navigate("/")
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: "Invalid data request" })
            })
    }

    return ( 
            <Form className="signupForm" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>User</Form.Label>
                <Form.Control className="signupFormControl" type="text" name="username" value={signupForm.username} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="itemImage" className="mb-3">
                    <Form.Label>Input Image</Form.Label>
                <Form.Control className="signupFormControl" type="file" onChange={uploadImage} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                <Form.Control className="signupFormControl" type="email" name="email" value={signupForm.email} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                <Form.Control className="signupFormControl" type="password" name="password" value={signupForm.password} onChange={handleInputChange} />
                </Form.Group>

                <Button className="signupFormButton" type="submit" disabled={loadingImage} style={{ width: '100%' }}>{loadingImage ? "Wait a moment please..." : "Signup"}</Button>
            </Form>
    )
}


export default SignupForm
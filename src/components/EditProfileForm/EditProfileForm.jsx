import { useContext, useState, useEffect } from "react"
import userService from "../../services/user.service"
import uploadService from "../../services/upload.service"
import { Container, Form, Button } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"


function EditProfileForm({ closeModal }) {

    const [editProfile, setEditProfile] = useState({
        username: "",
        password: "",
        imgProfile: ""
    })


    const [loadingImage, setLoadingImage] = useState(false)

    const { user, authenticateUser, storeToken } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target

        setEditProfile({
            ...editProfile,
            [name]: value
        })
    }


    const uploadProfileImage = e => {
        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append("imageData", e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setEditProfile({ ...editProfile, imgProfile: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()

        userService
            .editProfile({ ...editProfile, email: user.email }, editProfile._id)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                closeModal()
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <h1>Hi, {user.username}</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>User</Form.Label>
                    <Form.Control className="formControl" type="text" name="username" value={editProfile.username} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="itemImage" className="mb-3">
                    <Form.Label>Input Image</Form.Label>
                    <Form.Control className="formControl" type="file" onChange={uploadProfileImage} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="formControl" type="password" name="password" value={editProfile.password} onChange={handleInputChange} />
                </Form.Group>

                <Button className="formButton" variant="dark" type="submit" disabled={loadingImage} style={{ width: '100%' }}>{loadingImage ? "Wait a moment please..." : "Edit"}</Button>
            </Form>
        </Container>
    )
}

export default EditProfileForm
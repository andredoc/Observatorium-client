import { useContext, useState } from "react"
import { Container, Modal, Button } from "react-bootstrap"
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm"
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service"
import { useNavigate, useParams } from "react-router-dom"
import "./ProfilePage.css"

function ProfilePage() {

    // const { user_id } = useParams()
    const { user, logOutUser } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    const deleteUser = () => {
        userService
            .deleteUser(user._id)
            .then(() => {
                logOutUser()
                navigate("/")
            })
            .catch(err => console.log(err))
    }

    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)


    return (
        <div className="stars">
            <div className="twinkling">
                <Container className="profilePage">
                    <div className="profileTitle">
                        <h1>Hi, {user?.username}</h1>
                        {user && user._id && <Button className="profileEditButton" variant="warning" onClick={handleModalOpen}>Edit Profile</Button>}
                    </div>

                    <img src={user?.imgProfile} alt={user?.username} className="profileImage mx-auto" />
                    <br />

                    {user && user._id && <Button variant="danger" onClick={deleteUser}>Delete User</Button>}



                    <Modal show={showModal} onHide={handleModalClose} size="lg">
                        <Modal.Header closeButton className="itemsPageModal">
                            <Modal.Title>Edit Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="itemsPageModal">
                            <EditProfileForm closeModal={handleModalClose} />
                        </Modal.Body>
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default ProfilePage
import {useState, useEffect, useContext} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import itemsService from "../../services/items.service"
import ratingService from "../../services/rating.service"
import { Row, Modal, Button } from "react-bootstrap"
import EditItemForm from "../../components/EditItemForm/EditItemForm"
import EditCommentForm from "../../components/EditCommentForm/EditCommentForm"
import "./UserItemsPage.css"

function UserItemsPage() {


    const [items, setItem] = useState([])
    const [selectEditItem, setSelectEditItem] = useState()
    const [comments, setComments] = useState([])
    const [editComment, setEditComment] = useState()

    const [showModal, setShowModal] = useState(false)
    const [showCommentModal, setShowCommentModal] = useState(false)

    
    


    const { user } = useContext(AuthContext)

    const navigate = useNavigate()


    useEffect(() => {
        loadItem()
        loadComments()
    }, [user])


    const loadItem = () => {
        itemsService
                .getUserItems(user._id)
                .then(({ data }) => {
                    setItem(data)
                })
                .catch(err => console.log(err))
    }

    const deleteItem = (item) => {
        itemsService
                .deleteItem(item._id)
                .then(() => {
                    navigate("/profile/userItems")
                    loadItem()
                })
                .catch(err => console.log(err))
    }

    const loadComments = () => {
        ratingService
                .getUserComments(user._id)
                .then(({ data }) => {
                    setComments(data)
                })
                .catch(err => console.log(err))
    }

    const deleteComment = (commentId) => {
        ratingService
                .deleteComment(commentId)
                .then(() => {
                    navigate("/profile/userItems")
                    loadComments()
                })
    }

    


    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = (item) => {
        setSelectEditItem(item)
        setShowModal(true)
    }

    const handleCommentModalClose = () => setShowCommentModal(false)

    const handleCommentModalOpen = (comment) => {
        setEditComment(comment)
        setShowCommentModal(true)
    }


    return (  
        <div className="allPage">

            <h1>User Page</h1>

            <hr/>

            <div className="allDiv">

                <div className="col-4 allItems">
                <h2>User items</h2>
                <p>{items?.map(item => {
                    return (
                        <>
                            <Row key={item?._id}>
                                <p>{item?.name}</p>
                                <img className="mx-auto" src={item?.img} alt={item?.name} style={{ width: "90px" }} />
                                <p>{item?.description}</p>
                                {user && user?._id === item?.owner && <Button className="mx-auto button" variant="warning" onClick={() => handleModalOpen(item)}>Edit</Button>}
                                {user && user?._id === item?.owner && <Button className="mx-auto button" variant="danger" onClick={() => deleteItem(item)}>Delete</Button>}
                                <hr/>
                            </Row>
                        </>
                        
                    )
                })}</p>
                </div>

                <div className="col-4 allItems">
                <h2>User Comments</h2>
                <p>{comments?.map(comment => {
                    return (
                        <>
                            <Row key={comment?._id}>
                                <p>{comment?.comment}</p>
                                {user && <Button className="mx-auto button" variant="warning" onClick={() => handleCommentModalOpen(comment)}>Edit</Button> }
                                {user && <Button className="mx-auto button" variant="danger" onClick={() => deleteComment(comment._id)}>Delete</Button>}
                                <hr/>
                            </Row>
                        </>
                    )
                })}</p>
                </div>

            </div>



            <Modal show={showModal} onHide={handleModalClose} size="lg">
                <Modal.Header closeButton className="itemsPageModal">
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body className="itemsPageModal">
                    <EditItemForm closeModal={handleModalClose} refreshItems={loadItem} item={selectEditItem} />
                </Modal.Body>
            </Modal>

            <Modal show={showCommentModal} onHide={handleCommentModalClose} sice="lg">
                <Modal.Header closeButton className="itemsPageModal">
                    <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body className="itemsPageModal">
                    <EditCommentForm closeModal={handleCommentModalClose} comment={editComment?.comment} commentId={editComment?._id} getComments={loadComments} />
                </Modal.Body>
            </Modal>
        </div>
        
    )
}

export default UserItemsPage
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ratingService from "../../services/rating.service"
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import EditCommentForm from "../../components/EditCommentForm/EditCommentForm"
import "./CommentBox.css"


function CommentBox() {

    const { item_id } = useParams()
    const [comments, setComments] = useState()
    const [commentData, setCommentData] = useState({
        comment: ""
    })

    const { user, isLoggedIn } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)
    const [editComment, setEditComment] = useState({
        comment: ""
    })

    useEffect(() => {
        getComments()
    }, [])

    console.log({ comments })

    const handleCreateComment = (e) => {
        e.preventDefault()

        ratingService
            .createComment(item_id, { ...commentData, owner: user._id })
            .then(({ data }) => {
                setCommentData({ comment: '' })
                const { comment, user, item, _id } = data
                getComments()
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target

        setCommentData({
            ...commentData,
            [name]: value
        })
    }

    const getComments = () => {
        ratingService
            .getItemComments(item_id)
            .then(({ data }) => {
                setComments(data)
            })
    }

    const deleteComment = (commentId) => {
        ratingService
            .deleteComment(commentId)
            .then(({ data }) => {
                console.log(data)
                getComments()
                // const updatedComments = comments.filter(({_id}) => _id !== data._id )
                // setComments(updatedComments)


            })
            .catch(err => console.log(err))
    }



    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = (comment) => {
        setEditComment(comment)
        setShowModal(true)

    }

    return (
        <>
            <Container>
                <Row>
                    {
                        isLoggedIn &&
                        <Form onSubmit={handleCreateComment}>
                            <Form.Group className="mb-3" controlId="comment">
                                <Form.Label>Write Comment</Form.Label>
                                    <Form.Control className="writeCommentFormControl" type="text" value={commentData.comment} onChange={handleInputChange} name="comment" />
                                <br/>
                                <Button className="writeCommentButton" type='submit'>Comment</Button>
                            </Form.Group>
                        </Form >
                    }

                    <div className="userName">
                        <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>Comments</h3>
                        <br/>

                    {
                        comments?.map((comment) => {
                            return (
                                <Col md={8} key={comment._id} style={{margin: "auto", textAlign: "center"}}>
                                    <div>


                                        <div>
                                            <img src={comment.user.imgProfile} style={{ width: "90px", borderRadius: "20%", marginBottom: "10px" }} />
                                            <p><strong>{comment.user.username}</strong></p>
                                        
                                            <p>{comment.comment}</p>

                                            <div className="editDeleteButtons">
                                                {user && user._id === comment.user._id && <Button className="editButton" variant="warning" onClick={() => handleModalOpen(comment)}>Edit</Button>}
                                                {user && (user._id === comment.user._id || user.role === "ADMIN") && <Button variant="danger" onClick={() => deleteComment(comment._id)}>Delete</Button>}
                                            </div>
                                            <hr/>
                                            <br/>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })
                    }
                    </div>

                </Row>
                
                
                
            </Container>
            <Modal show={showModal} onHide={handleModalClose} size="lg">
                <Modal.Header closeButton className="itemsPageModal">
                    <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body className="itemsPageModal">
                    <EditCommentForm closeModal={handleModalClose} comment={editComment.comment} commentId={editComment._id} getComments={getComments}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CommentBox

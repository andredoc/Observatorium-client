import './ItemDetailsPage.css'
import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap"
import itemsService from "./../../services/items.service"
import { AuthContext } from "../../context/auth.context"
import EditItemForm from "../../components/EditItemForm/EditItemForm"
import ratingService from "./../../services/rating.service"
import CommentBox from "../../components/CommentBox/CommentBox"
import {BsHeartFill} from "react-icons/bs"

function ItemDetailsPage({ refreshItems }) {

    const { user, isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const [itemDetails, setItemDetails] = useState({})
    // const [comments, setComments] = useState([])
    const [likeItem, setLikeItem] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { item_id } = useParams()
    const [rating, setRating] = useState([])
    const [commentData, setCommentData] = useState({
        comment: ''
    })

    const { comment } = commentData

    useEffect(() => {
        loadItem()
    }, [])

    useEffect(()=>{
        checkCurrentUserLikeItem()
    },[itemDetails, user])

    const loadItem = () => {
        itemsService
            .getOneItem(item_id)
            .then(({ data }) => {
                setItemDetails(data.item)
                // setComments(data.ratings)
            })
            .catch(err => console.log(err))

    }

    // const handleInputChange = e => {
    //     const { value, name } = e.target

    //     setCommentData({
    //         ...commentData,
    //         [name]: value
    //     })
    // }

    // const handleSubmit = e => {
    //     e.preventDefault()

    //     ratingService
    //         .createComment(item_id, { ...commentData, owner: user._id })
    //         .then(({data}) => {
    //             setCommentData({comment: ''})
    //             const {comment, user, item, _id} = data
    //             // setComments((previousComment) => [...previousComment, { comment, user, item, _id }])
    //             refreshItems()
    //         })
    //         .catch(err => console.log(err))

    // }

    const handleLikeItem = () => {

        itemsService
            .updateLikeToItem(item_id, !likeItem)
            .then(({data}) => {
                setItemDetails({...itemDetails, likes: data.likes})
            })
            .catch(err => console.log(err))
    }

    const checkCurrentUserLikeItem = ()=>{
        if(itemDetails.likes && user){
            const liked = itemDetails.likes.filter(like => like.user === user._id)
            setLikeItem(liked.length>0)
        }
    }

    const deleteItem = () => {
        itemsService
            .deleteItem(item_id)
            .then(() => {
                navigate("/items-list")
            })
            .catch(err => console.log(err))
    }

    

    const handleLike = () => {

    }

    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    return (

        <>
            <Container>
                <div className='detailsTitle'>
                    <h1>Details of {itemDetails.name}</h1>
                    <Link to="/items-list">
                        <Button variant="dark">Go Back</Button>
                    </Link> 
                </div>
                 
                <hr/>
                <Row>
                    <Col md={6}>
                        <img src={itemDetails.img} alt={itemDetails.name} style={{ width: "100%", maxHeight: "90vh" }} />
                    </Col>

                    <Col md={{span: 4, offset: 1}}>
                        <h3>Information </h3>
                        <p>{itemDetails.description}</p>
                        <h3>Specifications</h3>
                        <p>Location: {itemDetails.location}</p>
                        <p>Size: {itemDetails.size}</p>


                        {user && user._id === itemDetails.owner && <Button className='editButton' variant="warning" onClick={handleModalOpen}>Edit</Button>}
                        {user && (user._id === itemDetails.owner || user.role === "ADMIN") && <Button variant="danger" onClick={deleteItem}>Delete</Button>}
                        

                        <br/><br/>
                        <div className='likes'>
                            <p>Likes: {itemDetails.likes && (<span className="likes-number-icon"><BsHeartFill /> {itemDetails.likes.length}</span>)}</p>
                            {user &&
                                <div className="d-grid gap-2">
                                    <Button onClick={handleLikeItem}><BsHeartFill className={likeItem ? 'heart-btn item-liked' : 'heart-btn item-not-liked'} /></Button>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>

            <br/><br/>

                    


            <CommentBox/>

                


                           

            

            <Modal show={showModal} onHide={handleModalClose} size="lg">
                <Modal.Header closeButton className="itemsPageModal">
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body className="itemsPageModal">
                    <EditItemForm closeModal={handleModalClose} refreshItems={loadItem} item={itemDetails} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ItemDetailsPage

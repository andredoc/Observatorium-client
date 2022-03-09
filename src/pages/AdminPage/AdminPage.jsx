import { useNavigate, useParams } from "react-router-dom"
import itemsService from "../../services/items.service"
import adminService from "../../services/admin.service"
import userService from "../../services/user.service"
import ratingService from "../../services/rating.service"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import { Row, Col, Button, Container } from "react-bootstrap"
import "./AdminPage.css"

function AdminPage() {

    const [items, setItems] = useState([])
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])

    const { user } = useContext(AuthContext)
    const { item_id } = useParams()


    const navigate = useNavigate()

    useEffect(() => {
        loadItems()
        loadUsers()
        loadComments()
    }, [])

    const loadItems = () => {
        itemsService
            .getAllItems()
            .then(({ data }) => {
                setItems(data)
            })
            .catch(err => console.log(err))
    }

    const deleteItem = (items) => {
        itemsService
            .deleteItem(items._id)
            .then(() => {
                navigate("/admin")
                loadItems()
            })
            .catch(err => console.log(err))
    }

    const loadUsers = () => {
        adminService
            .getAllUsers()
            .then(({ data }) => {
                setUsers(data)
            })
            .catch(err => console.log(err))
    }

    const deleteUser = (users) => {
        userService
            .deleteUser(users._id)
            .then(() => {
                navigate("/admin")
                loadUsers()
            })
            .catch(err => console.log(err))
    }

    const loadComments = () => {
        ratingService
            .getAllComments()
            .then(({ data }) => {
                setComments(data)
            })
            .catch(err => console.log(err))
    }

    const deleteComment = (comments) => {
        ratingService
            .deleteComment(comments._id)
            .then(() => {
                navigate("/admin")
                loadComments()
            })
            .catch(err => console.log(err))
    }


    return (

        <>
            <div className="stars">
                <div className="twinkling">
                    <h1>Admin Page</h1>
                    <hr />
                    <div className="allDiv">
                        <div className="col-4 allItems">
                            <h2>Items</h2>
                            {items.map(items => {
                                return (
                                    <Row key={items._id}>
                                        <img className="mx-auto" src={items.img} alt={items.name} style={{ width: "90px" }} />
                                        <p>{items.name}</p>
                                        {user && user.role === "ADMIN" && <Button className="mx-auto button" variant="danger" onClick={() => deleteItem(items)}>Delete</Button>}
                                        <hr />
                                    </Row>
                                )
                            })}
                        </div>

                        <div className="col-4 allItems">
                            <h2>Users</h2>

                            {users.map(users => {
                                return (
                                    <Row key={users._id}>
                                        <img className="mx-auto" src={users.imgProfile} alt={users.username} style={{ width: "90px" }} />
                                        <p>{users.username}</p>
                                        {user && user.role === "ADMIN" && <Button className="mx-auto button" variant="danger" onClick={() => deleteUser(users)}>Delete</Button>}
                                        <hr />
                                    </Row>
                                )
                            })}
                        </div>

                        <div className="col-4 allItems">
                            <h2>Comments</h2>

                            {comments.map(comments => {
                                return (
                                    <Row key={comments._id}>
                                        <p>{comments.comment}</p>
                                        {user && user.role === "ADMIN" && <Button className="mx-auto button" variant="danger" onClick={() => deleteComment(comments)}>Delete</Button>}
                                        <hr />
                                    </Row>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPage
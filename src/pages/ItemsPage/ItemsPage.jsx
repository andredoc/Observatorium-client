import { useEffect, useState, useContext } from "react"
import itemsService from "../../services/items.service"
import { Button, Container, Modal } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import CreateItemForm from "../../components/CreateItemForm/CreateItemForm"
import ItemList from "../../components/ItemList/ItemList"
import "./ItemsPage.css"



function ItemsPage() {

    const [items, setItems] = useState([])
    const [showModal, setShowModal] = useState(false)

    const { isLoggedIn } = useContext(AuthContext)

    

    useEffect(() => {
        loadItems()
    }, [])

    const loadItems = () => {
        itemsService
                .getAllItems()
                .then(({ data }) => {
                    setItems(data)
                })
                .catch(err => console.log(err))
                
    }

    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    return (
        <>

            

            <Container>
                <h1 className="titleContainer">
                    Item Page
                    {isLoggedIn && <Button className="createCardButton" onClick={handleModalOpen}>Create New Item</Button>}
                </h1>
                <ItemList items={items}/>
            </Container>

            <Modal show={showModal} onHide={handleModalClose} size="lg">
                <Modal.Header closeButton className="itemsPageModal">
                    <Modal.Title>New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body className="itemsPageModal">
                    <CreateItemForm closeModal={handleModalClose} refreshItems={loadItems} />
                </Modal.Body>
            </Modal>


        </>
        

    )
}

export default ItemsPage
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./ItemCard.css"


function ItemCard({ name, img, _id, owner }) {

    const prueba = () => alert("Está funcionando")

    return (  
        <Card className="ItemCard">
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Link to={`/item/${_id}`} className="cardLink">
                    <div className="d-grid gap-2">
                        <Button className="cardButton">Item Details</Button>
                    </div>
                </Link>
            </Card.Body>
        </Card >

    )
}

export default ItemCard
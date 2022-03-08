import { Row, Col } from"react-bootstrap"
import ItemCard from "../ItemCard/ItemCard"

function ItemList({ items }) {

    return (
        <Row>
            {items.map(item => {
                return (
                    <Col md={4} key={item._id}>
                        <ItemCard {...item}/>
                    </Col>
                )
            })}
        </Row>
    )
}

export default ItemList
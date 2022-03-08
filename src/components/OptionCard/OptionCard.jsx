import "./OptionCard.css"
import { Card } from "react-bootstrap"

function OptionCard({ image }) {

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
        </Card>
    )
}

export default OptionCard
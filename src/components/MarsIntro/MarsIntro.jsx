import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import "./MarsIntro.css"

function MarsIntro() {
    return (
        <div className="topContainer">
            <h3 className="marsSlogan">
                <span className="capital">Mars: The Red Planet</span><br /><br />
                Mars may once have been warm and wet, <br />
                it is now a cold, dry, barren place. <br />
                The atmosphere is thin and mainly carbon dioxide.
            </h3>
            <br />
            <div className="buttonContainer">
                <Link to="weather">
                    <Button variant="primary" className="ms-auto me-5">Weather</Button>
                </Link>
                <Link to="carousel">
                    <Button variant="primary" className="ms-auto">Carousel</Button>
                </Link>
            </div>
        </div>
    )
}

export default MarsIntro
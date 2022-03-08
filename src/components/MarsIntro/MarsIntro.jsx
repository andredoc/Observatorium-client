import { Link, Outlet } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import "./MarsIntro.css"

function MarsIntro() {
    return (
        <div className="top-section-container">
            <h3 className="slogan">
                <span className="capitalize">Mars: The Red Planet</span><br /><br />
                Mars may once have been warm and wet, it is now a cold, dry, barren place. The atmosphere is thin and mainly carbon dioxide.
            </h3>
            <br />
            <div style={{ float: 'right' }} >
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
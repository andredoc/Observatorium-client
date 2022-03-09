import "./HomePage.css"
import { useState, useEffect } from "react"
import OptionCard from "../../components/OptionCard/OptionCard"
import apodService from "../../services/Nasa/apod.service"
import { Container, Row, Col } from "react-bootstrap"
import planetEarth from "../../assets/images/planet-earth.jpeg"
import planetMars from "../../assets/images/planet-mars.jpeg"
import spaceImage from "../../assets/images/space.jpeg"
import { Link } from "react-router-dom"
import LoadingSpinner from "./../../components/LoadingSpinner/LoadingSpinner"

//property Apod: title, explanation, url    

function HomePage() {

    const [pictureDay, setPictureDay] = useState()

    useEffect(() => {
        apodService
            .getPictureOfDay()
            .then((response) => {
                setPictureDay(response.data)
            })

    }, [])

    return (
        <div className="pictureDay">
            {/* <div>
                <img src={pictureDay.url} />
                <h3>{pictureDay.title}</h3>
                <p>{pictureDay.explanation}</p>
               </div> */}
            {
                !pictureDay ?

                    <LoadingSpinner />

                    :

                    <div className="textDay">
                        <h3>{pictureDay.title}</h3>
                        <p>{pictureDay.explanation}</p>
                        <br/><br/>
                        <img src={pictureDay.url} />
                    </div>

            }

            {/* <Container>
                <Row className="justify-content-md-center">
                    <Col md={3}>
                        <Link to={`/earth`}>
                            <OptionCard image={planetEarth} />
                        </Link>
                    </Col>
                    <Col md={3}>
                        <Link to={`/items-list`}>
                            <OptionCard image={spaceImage} />
                        </Link>                     
                    </Col>
                    <Col md={3}>
                        <Link to={`/mars`}>
                            <OptionCard image={planetMars} />
                        </Link>  
                    </Col>


               </Row>
           </Container> */}

        </div>

    )
}

export default HomePage
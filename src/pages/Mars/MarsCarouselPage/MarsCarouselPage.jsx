import { useState, useEffect } from "react"
import marsService from "../../../services/mars.service"
import { Carousel } from "react-bootstrap"
import "./MarsCarouselPage.css"

function MarsCarouselPage() {

    const [pictureMars, setPictureMars] = useState([])

    useEffect(() => {
        marsService
            .getPicture()
            .then(({ data }) => {
                setPictureMars(data.photos)
            })
    }, [])

    return (
        <div className="stars">
            <div className="twinkling">
                <div className="carouselDiv">
                    <Carousel fade>
                        {
                            pictureMars.map((pics) => {
                                return (
                                    <Carousel.Item key={pics.id} interval={1000}>
                                        <img
                                            className="d-block w-100"
                                            src={pics.img_src}
                                            alt={pics.earth_date}
                                            style={{ height: 640, objectFit: "cover" }}
                                        />
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default MarsCarouselPage
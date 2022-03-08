import { useState, useEffect } from "react"
import marsService from "../../../services/mars.service"
import { Carousel } from "react-bootstrap"

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
        <Carousel>
            {
                pictureMars.map((pics) => {
                    return (
                        <Carousel.Item key={pics.id} interval={0}>
                            <img
                                className="d-block w-100"
                                src={pics.img_src}
                                alt={pics.earth_date}
                            />
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}

export default MarsCarouselPage
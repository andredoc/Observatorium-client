import "./HomePage.css"
import { useState, useEffect } from "react"
import apodService from "../../services/Nasa/apod.service"
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
        </div>
    )
}

export default HomePage
import { useState } from "react"
import itemsService from "../../services/items.service"
import { Form, Button } from "react-bootstrap"
import uploadService from "../../services/upload.service"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import "./CreateItemForm.css"


function CreateItemForm({closeModal,refreshItems}) {

    const [itemData, setItemData] = useState({
        name: "",
        img: "",
        description: "",
        location: "",
        size: ""
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const { name, img, description, location, size } = itemData

    const { user } = useContext(AuthContext)


    const handleInputChange = e => {
        const { value, name } = e.target

        setItemData({
            ...itemData,
            [name]: value
        })
    } 

    const uploadItemImage = e => {
        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append("imageData", e.target.files[0])

        uploadService
                .uploadImage(uploadData)
                .then(({ data }) => {
                    setLoadingImage(false)
                    setItemData({...itemData, img: data.cloudinary_url})
                })
                .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()

        itemsService
                .createItem({...itemData, owner: user._id})
                .then(({ data }) => {
                    refreshItems()
                    closeModal()
                })
                .catch(err => console.log(err))

    }

    return(

        <>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Name</Form.Label>
                    <Form.Control className="formControl" type="text" value={name} onChange={handleInputChange} name="name" />
                </Form.Group>

                <Form.Group controlId="itemImage" className="mb-3">
                    <Form.Label>Input Image</Form.Label>
                    <Form.Control className="formControl" type="file" onChange={uploadItemImage}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control className="formControl" type="text" value={description} onChange={handleInputChange} name="description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="length">
                    <Form.Label>Location</Form.Label>
                    <Form.Control className="formControl" type="text" value={location} onChange={handleInputChange} name="location" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="inversions">
                    <Form.Label>Size</Form.Label>
                    <Form.Control className="formControl" type="text" value={size} onChange={handleInputChange} name="size" />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button className="formButton" type="submit" disabled={loadingImage}>{loadingImage ? "Wait a moment please..." : "Create Item"}</Button>
                </div>

            </Form >
        </>
        
    )
}

export default CreateItemForm
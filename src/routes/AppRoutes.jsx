import { Routes, Route } from "react-router-dom"

import SignupPage from "./../pages/SignupPage"
import LoginPage from "./../pages/LoginPage"
import HomePage from "../pages/HomePage/HomePage"
import ItemsPage from "../pages/ItemsPage/ItemsPage"
import ItemDetailsPage from "./../pages/ItemDetailsPage/ItemDetailsPage"
import EarthPage from "./../pages/EarthPage/EarthPage"
import MarsPage from "../pages/Mars/MarsPage/MarsPage"
import MarsCarouselPage from "../pages/Mars/MarsCarouselPage/MarsCarouselPage"
import MarsWeatherPage from "../pages/Mars/MarsWeatherPage/MarsWeatherPage"
import ProfilePage from "./../pages/ProfilePage/ProfilePage"
import AdminPage from "./../pages/AdminPage/AdminPage"
import PrivateRoute from "./PrivateRoute"
import UserItemsPage from "../pages/UserItemsPage/UserItemsPage"
import Earth3dPage from "../pages/Earth3d/Earth3d"
import PrivateRouteAdmin from "./PrivateRouteAdmin"


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Earth3dPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/items-list" element={<ItemsPage />} />
            <Route path="/item/:item_id" element={<ItemDetailsPage />} />
            <Route path="/earth" element={<EarthPage />} />
            <Route path="/mars" element={<MarsPage />} >
                <Route path="carousel" element={<MarsCarouselPage />} />
                <Route path="weather" element={<MarsWeatherPage />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute />}>
                <Route path="" element={<ProfilePage />} />
                <Route path="/profile/userItems" element={<UserItemsPage />} />
            </Route>


            <Route path="/admin" element={<PrivateRouteAdmin />}>
                <Route path="" element={<AdminPage />} />
            </Route>


            <Route path="/apod" element={<HomePage />} />
            {/* <Route path="/profile/my-items" element={<profile />} />  // Por revisarlo */}
            {/* Crear ruta para página 404 ERROR */}

        </Routes>
    )
}

export default AppRoutes
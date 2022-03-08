import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate, Outlet } from "react-router-dom"
import LoadingSpinner from "./../components/LoadingSpinner/LoadingSpinner"

function PrivateRouteAdmin() {

    const { isAdmin, isLoading, isLoggedIn } = useContext(AuthContext)

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!isAdmin || !isLoggedIn) {
        return <Navigate to="/" />
    }

    return <Outlet />
}

export default PrivateRouteAdmin
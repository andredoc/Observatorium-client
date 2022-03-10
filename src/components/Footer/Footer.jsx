import './Footer.css'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    const { pathname } = useLocation()
    if (pathname === "/items-list") {
        return null
    } else if (pathname === "/item/:item_id") {
        return null
    } else if (pathname === "/mars") {
        return null
    } else if (pathname === "/mars/carousel") {
        return null
    } else if (pathname === "/mars/weather") {
        return null
    } else if (pathname === "/earth") {
        return null
    } else if (pathname === "/apod") {
        return null
    } else if (pathname === "/profile") {
        return null
    } else if (pathname === "/profile/userItems") {
        return null
    } else if (pathname === "/admin") {
        return null
    } else if (pathname === "/login") {
        return null
    } else if (pathname === "/signup") {
        return null
    } 

    return (<footer>Created by André Documet, Ricardo Ronchetti y Roberto Cadenas</footer>)
}

export default Footer
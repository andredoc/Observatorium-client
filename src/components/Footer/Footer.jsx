import './Footer.css'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    const { pathname } = useLocation()
    if (pathname === "/items-list") {
        return <div className="transparent-footer"/>
    } else if (pathname === "/item/:item_id") {
        return <div className="transparent-footer"/>
    } else if (pathname === "/mars") {
        return <div className="transparent-footer"/>
    } else if (pathname === "/mars/carousel") {
        return <div className="transparent-footer"/>
    } else if (pathname === "/mars/weather") {
        return <div className="transparent-footer" />
    } else if (pathname === "/earth") {
        return <div className="transparent-footer" />
    } else if (pathname === "/apod") {
        return <div className="transparent-footer" />
    } else if (pathname === "/profile") {
        return <div className="transparent-footer" />
    } else if (pathname === "/profile/userItems") {
        return <div className="transparent-footer"/>
    } else if (pathname === "/admin") {
        return <div className="transparent-footer"/>
    } else if (pathname === "/login") {
        return null
    } else if (pathname === "/signup") {
        return null
    } 

    return (<footer>Created by André Documet, Ricardo Ronchetti y Roberto Cadenas</footer>)
}

export default Footer
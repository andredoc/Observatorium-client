import './Footer.css'
import { useLocation } from 'react-router-dom'

const Footer = ({ path }) => {
    const { pathname } = useLocation()
    if (pathname === "/items-list") {
        return null
    } else if (pathname === "/mars/carousel") {
        return null
    } else if (pathname === "/mars/weather") {
        return null
    }
    return (<footer>Created by André Documet, Ricardo Ronchetti y Roberto Cadenas</footer>)
}

export default Footer
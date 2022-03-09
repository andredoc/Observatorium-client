import { NavLink } from 'react-router-dom'
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
import "./Navigation.css"
import { useContext } from 'react'
import { AuthContext } from "./../../context/auth.context"
import { useEffect, useState } from 'react'

function Navigation() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)


    return (
        < Navbar bg="dark" variant='dark' expand="lg" style={{ marginBottom: 30 }}>
            <Container>
                <NavLink to="/" className="navlink">
                    <Navbar.Brand as="span">Observatorium</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {
                    !isLoggedIn ?
                        <>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto">
                                    <NavLink to="/login" className="navlink">
                                        <Nav.Link as="span">Login</Nav.Link>
                                    </NavLink>
                                    <NavLink to="/signup" className="navlink">
                                        <Nav.Link as="span">SignUp</Nav.Link>
                                    </NavLink>
                                </Nav>
                            </Navbar.Collapse>
                        </>

                        :

                        <>

                            <Nav className="m-auto">
                                <NavLink to="/earth" className="navlink">
                                    <Nav.Link as="span">EARTH</Nav.Link>
                                </NavLink>
                                <NavLink to="/items-list" className="navlink">
                                    <Nav.Link as="span">SPACE</Nav.Link>
                                </NavLink>
                                <NavLink to="/mars" className="navlink">
                                    <Nav.Link as="span">MARS</Nav.Link>
                                </NavLink>
                                <NavLink to="/apod" className="navlink">
                                    <Nav.Link as="span">PIC OF THE DAY</Nav.Link>
                                </NavLink>
                            </Nav>

                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                    {/* <img src="./../../logo192.png" style={{ width: "50px", objectFit: "cover" }} /> */}
                                    <img src={user?.imgProfile} style={{ width: "50px", objectFit: "cover" }} />

                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item href="/profile">
                                        <NavLink to={"/profile"} className="navlink">Profile</NavLink>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/profile">
                                        <NavLink to={"/profile/userItems"} className="navlink">My Items</NavLink>
                                    </Dropdown.Item>
                                    < Dropdown.Item href="/admin">
                                        {user && user.role === "ADMIN" && <NavLink to={"/admin"} className="navlink">Administration</NavLink>}
                                    </Dropdown.Item>


                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={logOutUser}>Log Out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                }

            </Container>
        </Navbar >
    )
}

export default Navigation

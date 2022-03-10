import { createContext, useState } from 'react'
import { useEffect } from 'react'
import authService from '../services/auth.service'


const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)

    const storeToken = (token) => {
        localStorage.setItem("authToken", token)
    }

    const removeToken = () => {
        localStorage.removeItem("authToken")
    }

    const getToken = () => {
        return localStorage.getItem("authToken")
    }

    const authenticateUser = () => {

        const storedToken = getToken()

        if (!storedToken) {
            logOutUser()
        } else {
            authService
                .verify(storedToken)
                .then(({ data }) => {
                    const user = data
                    setIsLoggedIn(true)
                    setIsLoading(false)
                    setUser(user)
                    data.role === "ADMIN" ? setIsAdmin(true) : setIsAdmin(false)
                })
                .catch(() => logOutUser())
        }
    }

    const logOutUser = () => {
        removeToken()
        setIsLoggedIn(false)
        setIsLoading(false)
        setUser(null)
        setIsAdmin(false)
    }

    useEffect(() => authenticateUser(), [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, isAdmin, user, getToken, storeToken, authenticateUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }
import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || null
    })

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    const logout = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const { user, setUser, logout } = useContext(UserContext)
    return { user, setUser, logout }
}

import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const [isLogin, setIsLogin] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async() => {
            try {
                const jwt = localStorage.getItem("jwt")
                const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/users`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })

                setIsLogin(true)
                setUser(data.data.user)
            } catch(error){
                console.log(error)
                setIsLogin(false)
            }
        }

        getUser()
    }, [])

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
import { useState } from "react";
import useAuth from "./useAuth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth"
import { useRouter } from 'next/navigation'

export const useLogout = () => {
    const [error, setError] = useState(null)
    const contextData = useAuth()
    const router = useRouter()

    // creating a logout function
    const logout = async () => {
        setError(null)

        try {
            await signOut(auth)

            // dispatching a logout function
            contextData.dispatch({ type: "LOGOUT" })
            router.push('/login')

            setError(null)
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }
    }

    return { error, logout }
    
}
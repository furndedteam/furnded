import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"
import { doc, updateDoc } from "firebase/firestore"; 

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuth()
    const navigate = useRouter()

    // creating a logout function
    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await signInWithEmailAndPassword(auth, email, password)

            if (!res) {
                throw new Error("Can't login at the moment")
            }
            const docRef = doc(db, 'profile', res.user.email)

            await updateDoc(docRef, {online: true})
            
            // dispatching a logout function
            dispatch({ type: 'LOGIN', payload: res.user })

            if(!isCancelled){
                setError(null)
                setIsPending(false)
            }
            navigate.push("/dashboard")
        } catch (err) {
            if(err){
                console.log(err.message)
                setError(err.message)
                setTimeout(() => {
                    setError(null)
                }, 3000);
                setIsPending()
             }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, login }
    
}
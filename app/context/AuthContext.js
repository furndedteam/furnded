"use client"
import { createContext, useReducer,  useEffect } from 'react'
import { auth } from "../firebase/config"
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        case 'AUTHSTATE':
            return {...state, user: action.payload}
    
        default:
            return state
    }
}

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, {user: auth.currentUser})

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            dispatch({type: "AUTHSTATE", payload: user})
        });
    }, [])
            
    console.log(state)


  return (
    <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
  )
}

import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export default function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        console.log("useContext must be used within the scope of a contextProvider")
    }

  return context
}

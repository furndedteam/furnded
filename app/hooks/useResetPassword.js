import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";


export default function useResetPassword() {
  const [resetMessage, setResetMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isPending, setIsPending] = useState(false)


  const resetPassword = (email) => {
    setIsPending(true)
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      setResetMessage("Check your Mailbox to Reset" )
    })
    .catch((error) => {
      setErrorMessage(error.message)
    })

    setIsPending(false)
  }

  return {errorMessage, resetMessage, resetPassword, isPending}
}

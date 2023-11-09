"use client"
import Navbar from "@/app/components/navbar/Navbar"
import { useEffect, useState } from 'react';
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation' ;
import useResetPassword from '@/app/hooks/useResetPassword';
import { ImSpinner2 } from "react-icons/im"
import Link from 'next/link';

export default function ForgotPassword() {
  const { user } = useAuth()
  const { resetPassword, isPending, errorMessage, resetMessage } = useResetPassword()
  const [formError, setFormError] = useState({
    email: "",
  })
  const router = useRouter()
  const [values, setValues] = useState({
    email: '',
  });

  const handleChange = (prop:string) => (event:any) => {
    setValues({ ...values, [prop]: event.target.value });
    setFormError({ ...formError, [prop]: null })
  };

  // handling reset
  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(values.email === "" || !values.email.includes("@") || values.email.length < 5) {
      setFormError({...formError, email: "Email is invalid"});
      return
    }
    resetPassword(values.email)
  }

  useEffect(() => {
    if(user) {
      router.push("/")
    }
  }, [user, router])


  return ((!user) &&
    <div>
      <Navbar />
      <form className="form" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <input placeholder="Enter Your Email"  onChange={handleChange("email")}/>

        {<button className="bigBtn full">{!isPending? "Reset": <ImSpinner2 className="spin"/>}</button>}
        {errorMessage && <p className="formError">{errorMessage}</p>}
        {resetMessage && <p className="formSuccess">{resetMessage}</p>}
        {formError.email && <p className="formError">{formError.email}</p>}
        
      <div className="formLinks">
        <Link href="/login">Back to Login?</Link>
      </div>
      </form>

    </div>
  )
}

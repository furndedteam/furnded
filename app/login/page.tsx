"use client"
import Navbar from '../components/navbar/Navbar';
import { useState } from 'react';
import {MdVisibility} from "react-icons/md"
import { ImSpinner2 } from "react-icons/im"
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation' 
import { useLogin } from '../hooks/useLogin';
import Link from 'next/link';


export default function Login() {
  const { user } = useAuth()
  const { login, isPending, error } = useLogin()
  const router = useRouter()
  const [showButton, setShowButton] = useState(false)
  const [formError, setFormError] = useState<{ [key: string]: string | null }>({ email: null, password: null })
  const [values, setValues] = useState({ password: '', email: '', showPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.type === 'email') {
      setValues({...values, email: e.target.value.toLowerCase()})
      if(e.target.value.length > 7 && e.target.value.includes('@') && values.password.length > 7)
        setShowButton(true)
      else setShowButton(false)
    }

    if(e.target.type === 'password' || e.target.type === 'text') {
      setValues({...values, password: e.target.value.toLowerCase()})
      if(values.email.length > 7 && values.email.includes('@') && e.target.value.length > 7)
        setShowButton(true)
      else setShowButton(false)
    }
  }

  const handleShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword})
  }


  // handling login
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      email: values.email,
      password: values.password,
    }
    
    if(values.email === "" || !values.email.includes("@") || values.email.length < 5) {
      setFormError({...formError, email: "Email is invalid"});
      return
    }
    if(values.password.length < 6) {
      setFormError({...formError, password: "Invalid Password"});
      return
    }

    login(data.email, data.password)
  }

  useEffect(() => {
    if(user) {
      router.push('/dashboard')
    }
  }, [user, router])


  return ((!user) &&
    <div>
      <Navbar/>
      <form className="form" onSubmit={handleLogin}>
      <h1>Welcome Back!</h1>
        <input value={values.email} onChange={handleChange} className='formInput' type='email' placeholder='Email' autoComplete="off"/>
        <div className="inputWrp2">
          {
            values.showPassword ?
            <input value={values.password} onChange={handleChange} className='formInput' type='text' placeholder='Password' autoComplete="new-password"/>
          : <input value={values.password} onChange={handleChange} className='formInput' type='password' placeholder='Password' autoComplete="new-password"/>
          }
          <MdVisibility onClick={handleShowPassword} className="visibility"/>
        </div>

        
        <div className='formLinks'> 
          <Link href="/forgot-password">Forgot <span>Password?</span> </Link>|
          <Link href="/login">Create new account</Link>
        </div>
        {showButton && <button className='bigBtn full slideAnim'>{!isPending? 'Sign In': <ImSpinner2 className="spin" />}</button>}
        {error && <p className='formError'>{error}</p>}
      </form>
    </div>
  )
}


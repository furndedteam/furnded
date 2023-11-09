import styles from './forgotPassword.module.css';
import Navbar from "../../components/Navbar"
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/router' ;
import useResetPassword from '../../hooks/useResetPassword';
import { PulseLoader } from 'react-spinners';
import Link from 'next/link';

export default function ForgotPassword() {
  const { user } = useAuth()
  const { resetPassword, isPending, errorMessage, successMessage } = useResetPassword()
  const [formError, setFormError] = useState({
    email: null,
  })
  const router = useRouter()
  const [values, setValues] = useState({
    email: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setFormError({ ...formError, [prop]: null })
  };

  // handling reset
  const handleReset = (e) => {
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
    <div className={styles.container}>
      <Navbar black={true}/>
      <form className={styles.form} onSubmit={handleReset}>
        <h1>Reset Password</h1>
        <TextField id="email" label="Email" variant="outlined" onChange={handleChange("email")}/>

        {!isPending && <button className="btn">Reset</button>}
        {isPending && <button disabled className="btn" style={{opacity: "50%"}}><PulseLoader color='#000000' size={10}/> </button>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {formError.email && <p className={styles.error}>{formError.email}</p>}
        
      <Link href="/login" className={styles.link}>Back to Login?</Link>
      </form>

    </div>
  )
}

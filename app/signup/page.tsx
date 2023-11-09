"use client"
import Navbar from "../components/navbar/Navbar"
import {MdVisibility} from "react-icons/md"
import {AiFillCamera} from "react-icons/ai"
import { ImSpinner2 } from "react-icons/im"
import { useEffect, useState } from 'react';
import { countries } from '../utils/countries';
import { useSignup } from '../hooks/useSignup';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation' ;
import Link from 'next/link';


export default function Index() {
  const { user } = useAuth()
  const router = useRouter()
  const {signUp, isPending, error:Error} = useSignup()
  const [error, setError] = useState<any>(null)
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({ 
    fullName: "", username: "", email: "", country: "", image: {size: 0, name: ""}, gender: 'Male', showPassword: false, referral: ""
  });

  // handling change for input fields
  const handleChange = (prop:string) => (e: React.ChangeEvent<HTMLInputElement>):void => {
    setValues({ ...values, [prop]: e.target.value });
    setError(null)
  };

  // handling password toggle mode
  const handleShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  }

  // handling image upload
  const handleImageUpload = (e:any) => {
    setValues({...values, image: e.target.files[0] });
  };


  // handling form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {showPassword, ...dataObj} = values
    const data = { ...dataObj, password: password};
    setError(null)

    // validating form
    if(values.fullName === "" || values.fullName.length < 3) {
      return setError("Full name is invalid or too short");
    }

    if(values.username === "" || values.username.length < 3) {
      return setError("Username is invalid or too short");
    }

    if(values.email === "" || !values.email.includes("@") || values.email.length < 5) {
      return setError("Email is invalid or too short");
    }

    if(values.country === "") {
      return setError("Select Your Country");
    }

    if(values.image === undefined || values.image.size > 5000000) {
      return setError("Image size is too large or invalid");
    }

    if(password === "" || password.length < 6) {
      return setError("Password is invalid or too short");
    }
    signUp(data);
  };


  useEffect(() => {
  if(user) {
    router.push('/dashboard')
  }

  if(Error) setError("An error has occurred")
  else {setError(null)}
  }, [user, router, Error]);


  return ((!user) &&
    <div>
    <Navbar />
    <form className="form" onSubmit={handleSubmit}>
      <h1>Create An Account</h1>
      <div className='inputWrp'>
        <label htmlFor="fullName">Full Name</label>
        <input value={values.fullName} type='text' id='fullName' onChange={handleChange("fullName")}/>
      </div>

      <div className='inputWrp'>
        <label htmlFor="username">Username</label>
        <input value={values.username} type='text' id='username' onChange={handleChange("username")}/>
      </div>

      <div className='inputWrp'>
        <label htmlFor="email">Email</label>
        <input value={values.email} type='email' id='email'  onChange={handleChange("email")}/>
      </div>

      <select value={values.country} onChange={(e) => setValues({...values, country: e.target.value})}>
        <option disabled value={'none'}>Select Your Country</option>
          {countries.map((country: {name: string}, i) => (
            <option key={i} value={country.name}> {country.name} </option>
          ))}
        </select>


        <select value={values.gender} onChange={(e) => setValues({...values, country: e.target.value})}>
          <option disabled>Select Your Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <div className="inputWrp2">
          {
            values.showPassword ?
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='formInput' type='text' placeholder='Password'/>
          : <input value={password} onChange={(e) => setPassword(e.target.value)} className='formInput' type='password' placeholder='Password'/>
          }
          <MdVisibility onClick={handleShowPassword} className="visibility"/>
        </div>

        <div className="upload inputWrp2">
          <p>{values.image?.name === ""? "Upload Profile Picture" : `${values.image?.name}`}</p>
          <input accept="image/*" type="file" onChange={handleImageUpload}/>
          <AiFillCamera />
        </div>


        <div className='inputWrp'>
          <label htmlFor="referral">Referral Code(Optional)</label>
          <input type='text' id='referral' onChange={() => handleChange("referral")}/>
        </div>

        <div className="inputWrp2">
          <input type="checkbox" className="checkBox"/>
          <p>I agree to receive third party email</p>
        </div>
        {error && <p className="formError">{error}</p>}
        {<button className="bigBtn full">{!isPending? "Sign Up": <ImSpinner2 className="spin"/>}</button>}
        <Link href="/login">Back to Login</Link>
      </form>

    </div>
  );
}

"use client"
import { useState } from 'react';
import { countries } from '@/app/utils/countries';

type countryObj = {
  code: string,
  name: string
}

export default function ContactForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('none');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);



  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find(cty => cty.code === e.target.value)

    if(country) {
      setSelectedCountry(country.name);
      setCountryCode(country.code);
    }
  }




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    
    if (fullName.length <3 || !email.includes('@') || email.length <7 
    || phoneNumber.length <3 || message.length <3 || selectedCountry === 'none')
      return setError('Enter all fields properly...');
    
    const contactDetails = {
      name: fullName,
      country: selectedCountry,
      phone: `${countryCode}${phoneNumber}`,
      email, message
    };
    
    try{
      setLoading(true);

      const res = await fetch(`/api/contact`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(contactDetails),
      })
    
      const data = await res.json()
      
      if(res.ok){
        setSuccess('Mail Sent Successfully')
        setLoading(false)
      } 
      else throw new Error(data.message)
    } catch (err: any) { 
      setError('Something went wrong, try again later...') 
      setLoading(false)
    }


    setEmail('');
    setFullName('');
    setPhoneNumber('');
    setMessage('');
    setSelectedCountry('none')
    setCountryCode('')
  }


  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Contact Me!</h2>
        <div className='inputWrp'>
          <label htmlFor="fullName">Full Name</label>
          <input value={fullName} type='text' id='fullName' onChange={(e) => setFullName(e.target.value)}/>
        </div>

        <div className='inputWrp'>
          <label htmlFor="email">Email</label>
          <input value={email} type='email' id='email'  onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <select value={countryCode} onChange={handleCountryChange}>
          <option value={'none'}>Select Your Country</option>
            {countries.map((country: countryObj, i) => (
              <option key={i} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>

          <div className='inputWrp'>
            <label htmlFor="phoneNumber">Phone Number</label>
            <div className='phoneInputWrp'>
              <span>{countryCode === ''? '+123' : countryCode}</span>
              <input
                type="text"
                id="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </div>
          </div>

        <div className='inputWrp'>
          <label htmlFor="message">Message</label>
          <textarea value={message} id='message' rows={4} onChange={(e) => setMessage(e.target.value)}/>
        </div>

        {error && <p className='formError res'>{error}</p>}
        {success && <p className='formSuccess res'>{success}</p>}
        <button className='bigBtn full'>{!loading? "Send" : "loading..." }</button>
      </form>
    </div>
  )
}

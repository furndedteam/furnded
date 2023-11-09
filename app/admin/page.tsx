"use client"
import Navbar from '@/app/components/navbar/Navbar'
import s from './admin.module.css'
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore"
import { db } from "../../app/firebase/config"
import { useEffect, useState } from "react"
import useAuth from '../../app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Users from '../components/users/Users'
import { ImSpinner2 } from 'react-icons/im'

export default function Index() {
  const router = useRouter()
  const { user } = useAuth()
  const [data, setData] = useState<null | any[]>(null)
  const [error, setError] = useState<string|null>(null)
  const [success, setSuccess] = useState<string|null>(null)
  const [ isPending, setIsPending ] = useState(false)
  const [ singleDoc, setSingleDoc ] = useState<any>({})
  const [ deposit, setDeposit ] = useState(0)
  const [ profit, setProfit ] = useState(0)
  const [ withdraw, setWithdraw ] = useState(0)


      
  useEffect(() => {
    const chatDiv = document.getElementById('tidio-chat')
    if(chatDiv) chatDiv.style.display = 'none'

    return () => {
      if(chatDiv) chatDiv.style.display = 'block'
    }
  }, [])

  useEffect(()=>{
    if(user){
      if(user.email === "support@furnded.com"){
        let q = query(collection(db, "profile"))
      
        const unsubscribe = onSnapshot(
            q, (snapshot) => {
            let results:any = []
            snapshot.forEach(doc => {
              results.push({ ...doc.data(), id: doc.id})
            });
    
            setData(results)
            setError(null)
          }, (error) => {
            setError("could not fetch data from the database...")
            console.log(error.message)
          });
          return () => unsubscribe()

      } else{
        router.push('/dashboard')
      }
    } else{
      router.push('/login')
    }
}, [user, router])


const filter = (email:string) => {
  if(data){
    let filteredDoc = data.filter((doc) => doc.email == email)
    setSingleDoc(filteredDoc[0])
    setDeposit(filteredDoc[0].bal.deposit)
    setProfit(filteredDoc[0].bal.profit)
    setWithdraw(filteredDoc[0].bal.withdraw)
  }
}

const Update = async() => {
  setIsPending(true)
  setError(null)
  setSuccess(null)
  
  const newData = {...singleDoc, bal: {deposit, profit, withdraw}}
  const docRef = doc(db, "profile", singleDoc.email)
  
  try {
    await setDoc(docRef, newData)
    setSuccess("Successfully updated profile")
  } catch (error) {
    setError("Error updating profile")
    console.log(error)
  }
  setIsPending(false)
}



if(!user){
  return (
    <div className={s.spinnerCtn}>
      <div className={s.spinner}>
      <ImSpinner2 className="spin spinBig" color="#1649ff"/>
      </div>
    </div>
  )
}


  return ((user && data) &&
    <div className={s.container}>
      <Navbar />
      <Users isPending={isPending} error={error} data={data} filter={filter}/>
        <div className={s.text}>
          <p>{singleDoc.email}</p>
        </div>
      <div className={s.main}>
        {singleDoc.bal &&
        <>
          <div className="form">
            <h2>{singleDoc.bal.title}</h2>
            <div className={s.wrp}>

              <div className='inputWrp'>
                <label>Deposit</label>
                <input
                type="number"
                className={s.textarea}
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))} 
                />
              </div>
  
              <div className='inputWrp'>
                <label>Profit</label>
                <input
                type="number"
                className={s.textarea} 
                value={profit}
                onChange={(e) => setProfit(Number(e.target.value))}    
                />
              </div>
  
              <div className='inputWrp'>
                <label>Profit</label>
                <input 
                type="number"
                className={s.textarea}
                value={withdraw}
                onChange={(e) => setWithdraw(Number(e.target.value))}       
                />
              </div>
            <button className={s.textarea} onClick={Update}>{isPending ? "updating..." : "Update"}</button>
            {error && <p className='formError'>{error}</p>}
            {success && <p className='formSuccess'>{success}</p>}
            </div>
          </div>
        </> 
        }
      </div>
    </div>
  )
}

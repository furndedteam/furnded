import { useState, useEffect } from 'react';
import styles from "./Modal.module.css";
import { MdOutlineClose } from "react-icons/md";
import Message from '../message/Message'
import useAuth from '../../hooks/useAuth'
import { useFirestore } from '../../hooks/useFirestore'
import { collection, onSnapshot, query, where, doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase/config"

type modalProp = {
  modal: (p:boolean) => void
}

export default function Modal({modal}:modalProp) {
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState<number>(0)
  const createdAt = new Date().toLocaleString()
  const { addDocument } = useFirestore("history")
  const { user } = useAuth()
  const [message, setMessage] = useState(false)
  const [success, setSuccess] = useState<string|null>(null)
  const [failed, setFailed] = useState<string|null>(null)
  const [userDetails, setUserDetails] = useState<any>([])


  useEffect(()=>{
    if(user){
      const q = query(collection(db, "profile"), where("email", "==", user.email))

      onSnapshot(q, 
        (snapshot) => {
          // looping through snapshot to get each individual doc
          snapshot.forEach(doc => {
            setUserDetails({ ...doc.data(), id: doc.id})
          })
        })
    }
  }, [user])

  

  const handleSubmit = (e:any) => {
    e.preventDefault()

    if (amount !== null && address !== null) {
      if (amount < userDetails.bal.withdraw) {
        let cal = userDetails.bal.withdraw - amount

        const newData = {...userDetails, "bal.withdraw": cal}
        const docRef = doc(db, "profile", user.email)
        setDoc(docRef, newData)
        setAddress('')
        setAmount(0)
        setSuccess("Withdraw successful and pending approval")
        addDocument({ title: "Withdraw", amount, createdAt, email: user.email, pending: false })
      }

      if(amount > userDetails.bal.withdraw) {
        setFailed("Insufficient funds")
        setAddress('')
        setAmount(0)
        addDocument({ title: "Withdraw", amount, createdAt, email: user.email, pending: "failed" })
      }
      setMessage(true)
    }
  }
  

  return (
      <div className={styles.container}>
        {message && <Message success={success} failed={failed}  setMessage={setMessage}/>}
        <MdOutlineClose size="1.5em" onClick={() => modal(false)}  style={{color: "whitesmoke", position: "absolute", top: "10px", right: "10px", cursor: "pointer"}}/>
        <form onSubmit={handleSubmit}>
          <h2>Withdraw</h2>
          <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder='Enter Bitcoin wallet address'/>
          <div className={styles.flex}>
            <input onChange={(e) => setAmount(Number(e.target.value))} value={amount} type="number" placeholder="USD" />
            <button>Submit</button>
          </div>
        </form>
      </div>
  )
}

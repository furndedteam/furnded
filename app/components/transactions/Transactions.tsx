import styles from './Transactions.module.css';
import { MdPending } from 'react-icons/md';
import { MdCheckCircle } from 'react-icons/md';
import { HiXCircle } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import useAuth from '../../hooks/useAuth'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const q = query(collection(db, "transactions"), where("email", "==", user.email))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const snapshot:any = []
      querySnapshot.forEach((doc) => {
        snapshot.push({ ...doc.data(), id: doc.id })
      })
      setTransactions(snapshot)
    })
    return unsubscribe
  }, [transactions, user])


  return (
      <div className={styles.container}>
        {transactions.map((doc:any) =>
          <div className={styles.wrapper} key={doc.id}>
          <div className={styles.desc1}>
            <p>{doc.type}</p>
            <p>${doc.amount}</p>
          </div>
          <div className={styles.desc2}>
            <p>{doc.date}</p>
            <div>
              <p>{doc.status}</p>
              {doc.status === "pending" &&<MdPending color='#ffa200'/>}
              {doc.status === "approved" &&<MdCheckCircle color='#62ff00'/>}
              {doc.status === "failed" &&<HiXCircle color='red'/>}
            </div>
          </div>
          </div>
        )}
      </div>
  )
}

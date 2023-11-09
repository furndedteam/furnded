import styles from './History.module.css';
import { MdOutlinePending } from 'react-icons/md';
import { MdCheckCircle } from 'react-icons/md';
import { HiXCircle } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import useAuth from '../../hooks/useAuth'

type docData = {
  title: string,
  amount: number, 
  createdAt: string, 
  pending: string
}

export default function History() {
  const [history, setHistory] = useState<any>([])
  const { user } = useAuth()

  useEffect(() => {
    const q = query(collection(db, "history"), where("email", "==", user.email))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => {
        return ({ ...doc.data(), id: doc.id })
      })
      setHistory(docs)
    })
    return unsubscribe
  }, [history, user])


  return (
      <div className={styles.container}>
        {history && history.map(({title, amount, createdAt, pending}:docData) =>
          <div className={styles.wrapper} key={createdAt}>
          <div className={styles.desc1}>
            <p>{title}</p>
            <p>${amount}</p>
          </div>
          <div className={styles.desc2}>
            {createdAt && <p>{createdAt}</p>}
            <div>
              <p>
                {(pending !== "failed" && !pending) ? 'Pending' : (pending !== "failed" && pending) ? 'Approved' : 'Failed'}
              </p>
              {
              (pending !== "failed" && !pending) ?  <MdOutlinePending color='#ff865e' size="1.5em"/> :
              (pending !== "failed" && pending) ? <MdCheckCircle color='#00e975' size="1.5em"/> :
              <HiXCircle color='red' size="1.5em"/>
              }
            </div>
          </div>
          </div>
        )}
      </div>
  )
}

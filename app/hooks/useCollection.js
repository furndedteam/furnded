import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../firebase/config"
import { useEffect, useState } from "react"
import useAuth from '../hooks/useAuth'


export default function useCollection(coll, allUsers, singleUser) {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)
  const { user, authIsReady } = useAuth()
  const [ isPending, setIsPending ] = useState(false)

  useEffect(() => {
    if(authIsReady && user){
      setIsPending(true)
      let q = query(collection(db, coll), where("email", "==", user.email))
  
      if (allUsers) q = query(collection(db, coll))
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
          let results = []
          snapshot.forEach(doc => {
            results.push({ ...doc.data(), id: doc.id})
          })

          if(allUsers) setData(results)
          else setData({...results[0]})
          setError(null)
          setIsPending(false)
        },
        (error) => {
          setError("could not fetch data frm the database.....")
        });
  
        return () => unsubscribe()
    }
  }, [coll, user, allUsers, singleUser, authIsReady])

  return { error, data, isPending }

}

import Navbar from '../../components/Navbar'
import styles from './admin.module.css'
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useEffect, useState } from "react"
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import Users from '../../components/Users'
import { Button, TextField } from '@mui/material'

export default function Index() {
  const router = useRouter()
  const { user } = useAuth()
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)
  const [ isPending, setIsPending ] = useState(false)
  const [ singleDoc, setSingleDoc ] = useState({})
  const [ cryptoDeposit, setCryptoDeposit ] = useState(0)
  const [ cryptoProfit, setCryptoProfit ] = useState(0)
  const [ cryptoWithdraw, setCryptoWithdraw ] = useState(0)
  const [ realEstateDeposit, setRealEstateDeposit ] = useState(0)
  const [ realEstateProfit, setRealEstateProfit ] = useState(0)
  const [ realEstateWithdraw, setRealEstateWithdraw ] = useState(0)
  const [ jewelryDeposit, setJewelryDeposit ] = useState(0)
  const [ jewelryProfit, setJewelryProfit ] = useState(0)
  const [ jewelryWithdraw, setJewelryWithdraw ] = useState(0)
  const [ stocksDeposit, setStocksDeposit ] = useState(0)
  const [ stocksProfit, setStocksProfit ] = useState(0)
  const [ stocksWithdraw, setStocksWithdraw ] = useState(0)


      
  useEffect(() => {
    const chatDiv = document?.getElementById('tidio-chat')
    if(chatDiv) chatDiv.style.display = 'none'

    return () => {
      if(chatDiv) chatDiv.style.display = 'block'
    }
  }, [])

  useEffect(()=>{
    if(user){
      if(user.email === "admin@gmail.com"){
        let q = query(collection(db, "profile"))
      
        const unsubscribe = onSnapshot(
          q, 
          (snapshot) => {
            let results = []
            snapshot.forEach(doc => {
              results.push({ ...doc.data(), id: doc.id})
            });
    
            // setting doc state
            setDocument(results)
            setError(null)
          },
          (error) => {
            // ...setting error param
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


const filter = (email) => {
  let filteredDoc = document.filter((doc) => doc.email == email)
  setSingleDoc(filteredDoc[0])
  setCryptoDeposit(filteredDoc[0].bal[0].deposit)
  setCryptoProfit(filteredDoc[0].bal[0].profit)
  setCryptoWithdraw(filteredDoc[0].bal[0].withdraw)
  setRealEstateDeposit(filteredDoc[0].bal[1].deposit)
  setRealEstateProfit(filteredDoc[0].bal[1].profit)
  setRealEstateWithdraw(filteredDoc[0].bal[1].withdraw)
  setJewelryDeposit(filteredDoc[0].bal[2].deposit)
  setJewelryProfit(filteredDoc[0].bal[2].profit)
  setJewelryWithdraw(filteredDoc[0].bal[2].withdraw)
  setStocksDeposit(filteredDoc[0].bal[3].deposit)
  setStocksProfit(filteredDoc[0].bal[3].profit)
  setStocksWithdraw(filteredDoc[0].bal[3].withdraw)
}

const cryptoUpdate = () => {
  setIsPending(true)
  const { bal: [crypto, real_estate, jewelry, stock] } = singleDoc
  const CRYPTO = {...crypto, deposit: cryptoDeposit, profit: cryptoProfit, withdraw: cryptoWithdraw}
  let newBal = [CRYPTO, real_estate, jewelry, stock]
  
  const newData = {...singleDoc, bal: [...newBal]}
  console.log(newData)
  const docRef = doc(db, "profile", singleDoc.email)
  setDoc(docRef, newData)
  setIsPending(false)
}

const realEstateUpdate = () => {
  setIsPending(true)
  const { bal: [crypto, real_estate, jewelry, stock] } = singleDoc
  const REAL_ESTATE = {...real_estate, deposit: realEstateDeposit, profit: realEstateProfit, withdraw: realEstateWithdraw}
  let newBal = [crypto, REAL_ESTATE, jewelry, stock]
  
  const newData = {...singleDoc, bal: [...newBal]}
  console.log(newData)
  const docRef = doc(db, "profile", singleDoc.email)
  setDoc(docRef, newData)
  setIsPending(false)
}

const jewelryUpdate = () => {
  setIsPending(true)
  const { bal: [crypto, real_estate, jewelry, stock] } = singleDoc
  const JEWELRY = {...jewelry, deposit: jewelryDeposit, profit: jewelryProfit, withdraw: jewelryWithdraw}
  let newBal = [crypto, real_estate, JEWELRY, stock]
  
  const newData = {...singleDoc, bal: [...newBal]}
  console.log(newData)
  const docRef = doc(db, "profile", singleDoc.email)
  setDoc(docRef, newData)
  setIsPending(false)
}

const stocksUpdate = () => {
  setIsPending(true)
  const { bal: [crypto, real_estate, jewelry, stock] } = singleDoc
  const STOCKS = {...stock, deposit: stocksDeposit, profit: stocksProfit, withdraw: stocksWithdraw}
  let newBal = [crypto, real_estate, jewelry, STOCKS]
  
  const newData = {...singleDoc, bal: [...newBal]}
  console.log(newData)
  const docRef = doc(db, "profile", singleDoc.email)
  setDoc(docRef, newData)
  setIsPending(false)
};




  return ((user && document) &&
    <div className={styles.container}>
      <Navbar black={true}/>
      <Users isPending={isPending} error={error} document={document} filter={filter}/>
        <div className={styles.text}>
          <p>{singleDoc.createdAt}</p>
          <p>{singleDoc.email}</p>
        </div>
      <div className={styles.main}>
        {singleDoc.bal &&
        <>
          <div className={styles.card}>
            <h2 className={styles.title}>{singleDoc.bal[0].title}</h2>
            <div className={styles.wrapper}>
            <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Deposit"
              type="number"
              size='small'
              className={styles.textarea}
              value={cryptoDeposit}
              onChange={(e) => setCryptoDeposit(Number(e.target.value))} 
              />
  
              <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Profit"
              type="number" 
              size='small'
              className={styles.textarea} 
              value={cryptoProfit}
              onChange={(e) => setCryptoProfit(Number(e.target.value))}    
              />
  
              <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Withdraw"
              type="number"
              size='small'
              className={styles.textarea}
              value={cryptoWithdraw}
              onChange={(e) => setCryptoWithdraw(Number(e.target.value))}       
              />
            <Button variant="outlined" className={styles.submit} onClick={cryptoUpdate}>{isPending ? "updating..." : "Update"}</Button>
            </div>
          </div>
          <div className={styles.card}>
            <h2 className={styles.title}>{singleDoc.bal[1].title}</h2>
            <div className={styles.wrapper}>
            <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Deposit"
              type="number"
              size='small'
              className={styles.textarea}
              value={realEstateDeposit}
              onChange={(e) => setRealEstateDeposit(Number(e.target.value))} 
              />
  
              <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Profit"
              type="number" 
              size='small'
              className={styles.textarea} 
              value={realEstateProfit}
              onChange={(e) => setRealEstateProfit(Number(e.target.value))}    
              />
  
              <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Withdraw"
              type="number"
              size='small'
              className={styles.textarea}
              value={realEstateWithdraw}
              onChange={(e) => setRealEstateWithdraw(Number(e.target.value))}       
              />
            <Button variant="outlined" className={styles.submit} onClick={realEstateUpdate}>{isPending ? "updating..." : "Update"}</Button>
            </div>
          </div>
          <div className={styles.card}>
            <h2 className={styles.title}>{singleDoc.bal[2].title}</h2>
            <div className={styles.wrapper}>
            <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Deposit"
              type="number"
              size='small'
              className={styles.textarea}
              value={jewelryDeposit}
              onChange={(e) => setJewelryDeposit(Number(e.target.value))} 
              />
  
              <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Profit"
              type="number" 
              size='small'
              className={styles.textarea} 
              value={jewelryProfit}
              onChange={(e) => setJewelryProfit(Number(e.target.value))}    
              />
  
              <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Withdraw"
              type="number"
              size='small'
              className={styles.textarea}
              value={jewelryWithdraw}
              onChange={(e) => setJewelryWithdraw(Number(e.target.value))}       
              />
            <Button variant="outlined" className={styles.submit} onClick={jewelryUpdate}>{isPending ? "updating..." : "Update"}</Button>
            </div>
          </div>
          <div className={styles.card}>
            <h2 className={styles.title}>{singleDoc.bal[3].title}</h2>
            <div className={styles.wrapper}>
            <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Deposit"
              type="number"
              size='small'
              className={styles.textarea}
              value={stocksDeposit}
              onChange={(e) => setStocksDeposit(Number(e.target.value))} 
              />
  
              <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Profit"
              type="number" 
              size='small'
              className={styles.textarea} 
              value={stocksProfit}
              onChange={(e) => setStocksProfit(Number(e.target.value))}    
              />
  
              <TextField 
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputLabelProps={{ shrink: true }}
              id="outlined-number"
              label="Withdraw"
              type="number"
              size='small'
              className={styles.textarea}
              value={stocksWithdraw}
              onChange={(e) => setStocksWithdraw(Number(e.target.value))}       
              />
            <Button variant="outlined" className={styles.submit} onClick={stocksUpdate}>{isPending ? "updating..." : "Update"}</Button>
            </div>
          </div>
        </> 
        }
      </div>
    </div>
  )
}

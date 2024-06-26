import styles from './DashboardNav.module.css';
import { MdKeyboardArrowDown, MdOutlinePendingActions, MdPending, MdCheckCircle, MdArrowBack } from "react-icons/md";
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineLogout, HiXCircle } from "react-icons/hi";
import { useLogout } from "../../hooks/useLogout"
import useAuth from "../../hooks/useAuth"
import useCollection from '../../hooks/useCollection';
import { updateDoc, doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import dateFormat from "dateformat";
import { ImSpinner2 } from 'react-icons/im';

export default function DashboardNav({admin}:{admin?: boolean}) {
  const { authIsReady, user } = useAuth()
  const { logout } = useLogout()
  const [menu, setMenu] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [amount, setAmount] = useState<null|number|string>(null);
  const [network, setNetwork] = useState<null|number|string>(null);
  const [address, setAddress] = useState<null|string>(null);
  const { data } = useCollection('profile', false, true);
  const { data: Doc2 } = useCollection('transactions', true, false) as any
  const [modalError, setModalError] = useState<null|string>(null);
  const [modalSuccess, setModalSuccess] = useState<null|string>(null);
  const [isPending, setIsPending] = useState(false);
  const ref = doc(db, "profile", user.email);
  

  const openTransaction = () => {
    setShowTransactions(true)
  }

  const handleTransaction = async (id:string, email:string, type:string) => {
    const newRef = doc(db, "transactions", id);
    const response = prompt("Type (yes || no) to approve or decline this transaction.")

    if(response === 'yes'){
      try{
        setIsPending(true)
        const res = await fetch(`/api/alertUser`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, type}),
        })
      
        const data = await res.json()
        
        if(res.ok){
          setIsPending(false)
        } 
        else throw new Error(data.message)
      } catch (err: any) { 
        setModalError('Something went wrong, try again later...') 
        setIsPending(false)
      }
      await updateDoc(newRef, {
        status: 'approved',
      })

      setAmount(null)
      setAddress(null)
    }

    if(response === 'no') {
      await updateDoc(newRef, {
        status: 'failed',
      })

      setIsPending(false)
      setAmount(null)
      setAddress(null)
    }
  }


  //show menu
  const handleClick = () => {
    if (menu) {
      setMenu(false)
    }
    if (!menu) {
      setMenu(true)
    }
  }


  const handleWithdraw = () => {
    setShowModal(true)
  }


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    setModalError(null)
    setModalSuccess(null)
    setIsPending(true)

    e.preventDefault();
    if(data){
      if(amount && address){
        const amountNumber = Number(amount);
        const { bal, displayName } = data as any;
        const availableWithdraw = bal.investment + bal.profit + bal.balance
        
        if(availableWithdraw >= amountNumber){
          const newInvestment = bal.balance - amountNumber;
          let newBalances = bal
          if(newInvestment <= 0) {
            const newBal = bal.profit + bal.investment + newInvestment;
            newBalances = {...bal, balance: newBal, profit: 0, investment: 0}
          }

          if(newInvestment >= 0) {
            newBalances = {...bal, balance: newInvestment}
          }
          const mailDetails = {
            amount: amountNumber,
            address,
            network,
            date: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss"),
            status: "pending",
            email: user.email,
            fullName: displayName,
            type: "withdrawal",
          }

        
          try{
            await updateDoc(ref, {
              "bal": newBalances
            });

            await addDoc(collection(db, "transactions"), mailDetails);
            
            const res = await fetch(`/api/withdraw`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(mailDetails),
            })
          
            const data = await res.json()
            
            if(res.ok){
              setIsPending(false)
              setModalSuccess("Withdraw has been sent successfully and pending approval")
            }
            else throw new Error(data.message)
          } catch (err: any) { 
            console.log(err.message)
            setModalError('Something went wrong, try again later...') 
            setIsPending(false)
          }
        } else {
          setModalError('Insufficient funds')
          setTimeout(() => {
            setModalError(null)
          }, 3000)
        }
      } else {
        setModalError('Please fill all fields')
        setTimeout(() => {
          setModalError(null)
        }, 3000)
      }
    }

    setIsPending(false)
  }

  const backToDashboard = () => {
    setModalSuccess(null)
    setShowModal(false)
    setAmount(null)
    setAddress(null)
    setModalError(null)
  }


  return ((authIsReady && user) &&
  <>
  {showTransactions && 
  <div className={styles.transaction}>
    <MdArrowBack className={styles.exit} onClick={() => setShowTransactions(false)}/>
    {Doc2?.map((doc:any, i:number) => (
      <div key={i} className={styles.transaction_item} onClick={() => handleTransaction(doc.id, doc.email, doc.type)}>
        <div className={styles.transaction_item_left}>
          <p>{doc.type}</p>
          <p>{doc.email}</p>
          <p>{doc.date}</p>
        </div>
        <div className={styles.transaction_item_right}>
          <h3><span>$</span>{doc.amount}</h3>
          {doc.status === "pending" && <p>{doc.status}<MdPending color='#ffa200'/></p>}
          {doc.status === "approved" && <p>{doc.status}<MdCheckCircle color='#62ff00'/></p>}
          {doc.status === "failed" && <p>{doc.status}<HiXCircle color='red'/></p>}
        </div>
      </div>
    ))}

  </div>  
  }
      {(modalSuccess && isPending) && 
      <div className={styles.modalSuccess}>
        <div className={styles.modalSuccessContainer}>
          <ImSpinner2 color="#ffd016"/>
          <h1>Processing Your Withdrawal</h1>
        </div>
      </div>
      }
      {(modalSuccess && !isPending) && 
      <div className={styles.modalSuccess}>
        <div className={styles.modalSuccessContainer}>
          <MdOutlinePendingActions size="4rem" color="#ffd016"/>
          <h1>Withdrawal Is Pending</h1>
          <p>Contact Us For More Info!</p>
          <button className={styles.back} onClick={backToDashboard}>Back To Dashboard</button>
        </div>
      </div>
      }
      {showModal &&
      <div className={styles.modal}>
        <div className={styles.modalcontent}>
          <form onSubmit={handleSubmit}>
            <h1>Enter Amount & Address</h1>
            <input 
              placeholder='Amount'
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
            <input 
              placeholder="USDT Wallet Address"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
            <input 
              placeholder="Network"
              type="text"
              onChange={(e) => setNetwork(e.target.value)}
            />
            <div className={styles.btns}>
              <button type="submit" className={styles.submit}>{!isPending ? "Withdraw" : "loading..."}</button>
              <p className={styles.cancel} onClick={() => setShowModal(false)}>Cancel</p>
            </div>
            {modalError && <p className="formError">{modalError}</p>}
            {modalSuccess && <p className="formSuccess">{modalSuccess}</p>}
          </form>
        </div>
      </div>
    }


    <div className={styles.container}>
      <div className={styles.hello} style={admin? {paddingLeft: "80px"}: {}}>
        <p>Hello! </p>
        <p>{user.displayName}</p>
      </div>
      <div className={styles.logo}>
        <div className={styles.image} onClick={handleClick}>
          <img src={user.photoURL ? user.photoURL : `https://robohash.org/${user.uid}`} alt="Avatar!" />
        </div>
        <MdKeyboardArrowDown size="1.8em" style={{cursor: 'pointer'}} onClick={handleClick}/>
        {menu && 
          <div className={styles.menu} onClick={handleClick}>
            {(user?.email !== "support@furnded.com") && 
            <>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/plans">Plans</Link>
              <Link href="#" onClick={handleWithdraw}>Withdraw</Link>
              <Link href="/dashboard/transactions">Transactions</Link>
            </>
            }
            {(user?.email === "support@furnded.com") && <Link href="#" onClick={openTransaction}>Transactions</Link>}
            <button onClick={logout}> Logout <HiOutlineLogout size="1.3em"/></button>
          </div>
        }
      </div>
    </div>
  </>
  )
}

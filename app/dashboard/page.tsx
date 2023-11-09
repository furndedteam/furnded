"use client"
import BalCard from '../components/balCard/BalCard'
import Charts from '../components/charts/Charts'
import DashboardNav from '../components/dashboardNav/DashboardNav'
import SideNav from '../components/sideNav/SideNav'
import styles from "./dashboard.module.css"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../firebase/config"
import { useState, useEffect } from 'react'
import Modal from '../components/modal/Modal'
import { useRouter } from "next/navigation"
import Profile from '../components/profile/Profile'
import Funding from '../components/funding/Funding'
import History from '../components/history/History'
import { ImSpinner2 } from "react-icons/im"
import useAuth from '../hooks/useAuth'



export default function Index() {
  const router = useRouter()
  const { user } = useAuth()
  const [userDetails, setUserDetails] = useState<any>({})
  const [modal, setModal] = useState(false)
  const [profile, setProfile] = useState(false)
  const [funding, setFunding] = useState(false)
  const [history, setHistory] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dashboard, setDashboard] = useState(true)

      
  useEffect(() => {
    const chatDiv = document?.getElementById('tidio-chat')
    if(chatDiv) chatDiv.style.display = 'none'

    return () => {
      if(chatDiv) chatDiv.style.display = 'block'
    }
  }, [])

  useEffect(()=>{   
    if(user){
      if(user.email === "support@furnded.com"){
        router.push("/admin")
      }
      const q = query(collection(db, "profile"), where("email", "==", user.email))

      onSnapshot(q, 
        (snapshot) => {
          // looping through snapshot to get each individual doc
          snapshot.forEach((doc: any) => {
            setUserDetails({ ...doc.data(), id: doc.id})
          })
          setIsLoading(false)
      })


    } else{
      router.push('/login')
    }
  }, [user, router])

const view = (event:string) => {
  if (event === "dashboard") {
    setDashboard(true)
    setProfile(false)
    setModal(false)
    setHistory(false)
    setFunding(false)
  }

  if (event === "profile") {
    setProfile(true)
    setDashboard(false)
    setModal(false)
    setHistory(false)
    setFunding(false)
  }

  if (event === "funding") {
    setFunding(true)
    setProfile(false)
    setDashboard(false)
    setModal(false)
    setHistory(false)
  }

  if (event === "history") {
    setHistory(true)
    setProfile(false)
    setDashboard(false)
    setModal(false)
    setFunding(false)
  }
}

if(isLoading){
  return (
    <div className={styles.spinnerCtn}>
      <div className={styles.spinner}>
      <ImSpinner2 className="spin spinBig" color="#1649ff"/>
      </div>
    </div>
  )
}

if(!isLoading){
  return (
  <div className={styles.ctn}>
    {modal && <Modal modal={setModal}/>}
    <div className={styles.sidebar}>
      <SideNav dashboard={dashboard} profile={profile} history={history} funding={funding} view={view}/>
    </div>

    <div className={styles.main}>
      {dashboard &&
        <>
          <DashboardNav modal={setModal} details={userDetails}/>
          <BalCard bal={userDetails.bal} />
          <Charts />
        </>
      }
      {profile && 
        <Profile details={userDetails} bal={userDetails.bal} view={view}/>
      }

      {funding &&
        <>
          <DashboardNav modal={setModal} details={userDetails}/>
          <Funding />
        </>
      }

      {history &&
        <>
          <DashboardNav modal={setModal} details={userDetails}/>
          <History/>
        </>
      }
    </div>
  </div>
  )
}

}
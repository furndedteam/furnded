import Image from 'next/image';
import styles from './Profile.module.css';
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { GoVerified } from "react-icons/go";

export default function Profile({details, bal, view}:any) {
  const [oneStar, setOneStar] = useState(false)
  const [twoStar, setTwoStar] = useState(false)
  const [threeStar, setThreeStar] = useState(false)
  const [fourStar, setFourStar] = useState(false)
  const [fiveStar, setFiveStar] = useState(false)

  useEffect(() => {
    if (bal) {

      if (bal.deposit >= 100 || bal.deposit >= 100 || bal.deposit >= 100 || bal.deposit >= 100) {
        setOneStar(true)
      }
      if (bal.deposit >= 1000 || bal.deposit >= 1000 || bal.deposit >= 1000 || bal.deposit >= 1000 ) {
        setTwoStar(true)
      }
      if (bal.deposit >= 10000 || bal.deposit >= 10000 || bal.deposit >= 10000 || bal.deposit >= 10000) {
        setThreeStar(true)
      }
      if (bal.deposit >= 100000 || bal.deposit >= 100000 || bal.deposit >= 100000 || bal.deposit >= 100000) {
        setFourStar(true)
      }
      if (bal.deposit >= 1000000 || bal.deposit >= 1000000 || bal.deposit >= 1000000 || bal.deposit >= 1000000) {
        setFiveStar(true)
      }
    }
  }, [bal])




  return (bal &&
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.image}>
          <Image src={details.photoURL} priority fill style={{objectFit: "cover"}} quality={100} alt='Profile'/>
          <div className={styles.filter}></div>
        </div>
          <div className={styles.small_img}>
            <Image src={details.photoURL} fill style={{objectFit: "cover"}} quality={100}  alt='Profile'/>
          </div>
      </div>

        <div className={styles.text}>
          <h1>{details.displayName}</h1>
          <p>{details.email}</p>
          <div className={styles.active}>
            <p>Badge 
              <span>
               <FaStar style={oneStar && {color: '#00e99b'}}/>
               <FaStar style={twoStar && {color: '#00e99b'}}/>
               <FaStar style={threeStar && {color: '#00e99b'}}/>
               <FaStar style={fourStar && {color: '#00e99b'}}/>
               <FaStar style={fiveStar && {color: '#00e99b'}}/>
              </span>
            </p>
            <p>Verified <span><GoVerified style={fiveStar && {color: '#00e99b'}}/></span></p>
            <a onClick={() => view("funding")}>Deposit</a>
          </div>
        </div>
    </div>
  )
}

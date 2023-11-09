import styles from './Users.module.css'
import IMG from "../public/assets/profileIMG.gif"
import Image from 'next/image'
import { HiArrowNarrowRight } from "react-icons/hi";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useState } from 'react';


export default function Users({document, error, isPending, filter}:any) {
  const [ fullWidth, setFullWidth ] = useState(false)



  return (
    <div className={fullWidth ? styles.container2 : styles.container}>
      {!fullWidth && <HiArrowNarrowRight size="1.5em" className={styles.arrow} onClick={() => setFullWidth(!fullWidth)}/>}
      {fullWidth && <HiArrowNarrowLeft size="1.5em" className={styles.arrow} onClick={() => setFullWidth(!fullWidth)}/>}
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {document && 
      document.map((user:any) => 
        <div className={styles.users} key={user.uid} onClick={() => filter(user.email)}>
            <div className={styles.img}>
              <Image 
                priority src={user.photoURL ? user?.photoURL : IMG} 
                width={33} height={33} objectFit='cover' objectPosition="center" 
                alt="avatar" style={{borderRadius: "50%"}}
                />
            </div>
            <p>{user.displayName}</p>
        </div>
      )
      }
    </div>
  )
}
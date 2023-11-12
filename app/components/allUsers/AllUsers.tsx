import styles from './Users.module.css'
import { HiArrowNarrowRight } from "react-icons/hi";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';


export default function Users({data, error, isPending, filter}:any) {
  const [ fullWidth, setFullWidth ] = useState(false)



  return (
    <div className={fullWidth ? styles.container2 : styles.container}>
      {!fullWidth && <HiArrowNarrowRight size="1.5em" className={styles.arrow} onClick={() => setFullWidth(!fullWidth)}/>}
      {fullWidth && <HiArrowNarrowLeft size="1.5em" className={styles.arrow} onClick={() => setFullWidth(!fullWidth)}/>}
      {isPending && <ImSpinner2 className="spin spinBig" color="#1649ff"/> }
      {error && <div>{error}</div>}

      {data && 
      data.map((user:any) => 
        <div className={styles.users} key={user.uid} onClick={() => filter(user.email)}>
            <div className={styles.img}>
              <img src={`https://robohash.org/${user.uid}`} width={33} height={33} alt="avatar" style={{borderRadius: "50%"}}/>
            </div>
            <p>{user.email}</p>
        </div>
      )
      }
    </div>
  )
}
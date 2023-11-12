// import styles
import styles from './SideNav.module.css'

//importing router functions
import { useRouter, useParams } from 'next/navigation'

//importing logout and auth context
import { useLogout } from '../../hooks/useLogout'
import useAuth from '../../hooks/useAuth'

//importing icons
import {BsPersonFill, BsPerson} from "react-icons/bs";
import { HiHome, HiOutlineHome, HiOutlineLogout} from "react-icons/hi";
import { MdOutlineAccountBalance, MdAccountBalance } from 'react-icons/md'
import { IoStatsChartOutline, IoStatsChart, IoBarChartOutline, IoBarChartSharp } from 'react-icons/io5'

export default function SideNav() {
  const { authIsReady, user } = useAuth()
  const { page } = useParams()
  const { logout } = useLogout()
  const router = useRouter()
  

  return (authIsReady && user &&
    <div className={styles.container}>
        <div className={styles.profile}>
            <img src={user.photoURL ? user.photoURL : `https://robohash.org/${user.uid}`} alt="avatar"/>
        </div>
        <div className={styles.links}>
          {page === undefined || page === "home" ? 
          <div className={styles.active}>
            <HiOutlineHome onClick={() => router.push("/dashboard/home")} className={styles.menuIcon}/> 
            <p onClick={() => router.push("/dashboard/home")}>Dashboard</p>
          </div> :
          <div>
            <HiHome onClick={() => router.push("/dashboard/home")} className={styles.menuIcon}/> 
            <p onClick={() => router.push("/dashboard/home")}>Dashboard</p>
          </div>
          }

          {(page === "fund") ?
          <div className={styles.active}>
            <MdOutlineAccountBalance onClick={() => router.push("/dashboard/fund")} className={styles.menuIcon}/> 
            <p onClick={() => router.push("/dashboard/fund")}>Add Fund</p>
          </div> :
          <div>
            <MdAccountBalance onClick={() => router.push("/dashboard/fund")} className={styles.menuIcon}/> 
            <p onClick={() => router.push("/dashboard/fund")}>Add Fund</p>
          </div>
          }

          {(page === "invest") ?
          <div className={styles.active}>
            <IoStatsChartOutline onClick={() => router.push("/dashboard/invest")} className={styles.menuIcon}/> 
            <p onClick={() => router.push("/dashboard/invest")}>Invest</p>
          </div> :
          <div>
            <IoStatsChart onClick={() => router.push("/dashboard/invest")} className={styles.menuIcon}/> 
            <p onClick={() => router.push("/dashboard/invest")}>Invest</p>
          </div>
          }

          {(page === "profile") ?
          <div className={styles.active}>
            <BsPerson onClick={() => router.push("/dashboard/profile")} className={styles.menuIcon}/> 
            <p onClick={() => router.push("/dashboard/profile")}>Profile</p>
          </div> :
          <div>
            <BsPersonFill onClick={() => router.push("/dashboard/profile")} className={styles.menuIcon}/> 
            <p onClick={() => router.push("/dashboard/profile")}>Profile</p>
          </div>
          }

          {(page === "chart") ?
          <div className={styles.active}>
            <IoBarChartOutline onClick={() => router.push("/dashboard/chart")} className={styles.menuIcon}/> 
            <p onClick={() => router.push("/dashboard/chart")}>TradingView</p>
          </div> :
          <div>
            <IoBarChartSharp onClick={() => router.push("/dashboard/chart")} className={styles.menuIcon}/> 
            <p onClick={() => router.push("/dashboard/chart")}>TradingView</p>
          </div>
          }

        </div>
        <div className={styles.exit} onClick={logout}>
          <HiOutlineLogout className={styles.logout} style={{marginLeft: "1rem"}}/>
          <p>LogOut</p>
        </div>
    </div>
  )
}

import styles from './SideNav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { MdNotificationsActive } from "react-icons/md";
import { RiFundsFill } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";
import { HiHome } from "react-icons/hi";
import logo from "../../../public/assets/logo.svg"

export default function SideNav({view, dashboard, profile, history, funding}:any) {


  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
           <Image src={logo} height={25} width={70} alt="logo" />      
        </Link>
      </div>
      <div className={styles.menu}>
        <a onClick={() => view("dashboard")}><div><HiHome size="1.5em" /><span>Dashboard</span></div></a>
        <a onClick={() => view("profile")}><div><RiUser3Fill size="1.5em" /><span>Profile</span></div></a>
        <a onClick={() => view("funding")}><div><RiFundsFill size="1.5em" /><span>Funding</span></div></a>
        <a onClick={() => view("history")}><div><MdNotificationsActive size="1.5em" /><span>History</span></div></a>
      </div>
      <div className={styles.menu2}>
        <a onClick={() => view("dashboard")}><div style={dashboard ? {color: "#294CAC"} : {color: "black"}}><HiHome /><span>Dashboard</span></div></a>
        <a onClick={() => view("profile")}><div style={profile ? {color: "#294CAC"} : {color: "black"}}><RiUser3Fill  /><span>Profile</span></div></a>
        <a onClick={() => view("funding")}><div style={funding ? {color: "#294CAC"} : {color: "black"}}><RiFundsFill /><span>Funding</span></div></a>
        <a onClick={() => view("history")}><div style={history ? {color: "#294CAC"} : {color: "black"}}><MdNotificationsActive  /><span>History</span></div></a>
      </div>
    </div>
  )
}

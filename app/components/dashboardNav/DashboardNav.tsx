import s from './DashboardNav.module.css';
import Image from "next/image"
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from 'react';
import { HiOutlineLogout } from "react-icons/hi";
import { useLogout } from "../../hooks/useLogout"
import Link from 'next/link';

interface IDashboardNavData {
  details: any
  modal: (b:boolean) => void
}

export default function DashboardNav({modal, details}: IDashboardNavData) {
  const { logout } = useLogout()
  const [menu, setMenu] = useState(false)

  const handleClick = () => {
    if (menu)  setMenu(false)
    if (!menu) setMenu(true)
  }

  const handleContact = () => {
    const input = prompt("Are you sure you want to contact me?", "Type 'yes' for confirmation")
    if (input == "yes") {
      window.location.assign("https://wa.me/message/TFU7HVOSZ5NRK1")
    }
  }


  return (
    <div className={s.container}>
      <div className={s.hello}>
        <p>Hello! </p>
        <p>{details.displayName}</p>
      </div>
      <div className={s.logo}>
        <div className={s.image}>
          <Image priority src={details.photoURL ? details.photoURL : '/assets/future.jpg'} width={35} height={35} alt="Avatar!" />
        </div>
        <MdKeyboardArrowDown size="1.3em" style={{cursor: 'pointer'}} onClick={handleClick}/>
        {menu && 
          <div className={s.menu} onClick={handleClick}>
            <Link href="/">Home</Link>
            <Link href="/invest">Plans</Link>
            <a onClick={() => modal(true)}>Withdraw</a>
            <a onClick={handleContact}>Contact</a>

            <button className='logout' onClick={logout}>Logout<HiOutlineLogout size="1.3em"/></button>
          </div>
        }
      </div>
    </div>
  )
}

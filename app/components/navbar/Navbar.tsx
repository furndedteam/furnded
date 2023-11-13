"use client"
import { useEffect, useState } from "react";
import s from "./Navbar.module.css";
import logo from "@/public/assets/logo.svg"
import Menu from "../menu/Menu";
import Image from "next/image"
import Link from "next/link"
import useAuth from "../../hooks/useAuth";
import { HiMiniChevronDown } from "react-icons/hi2";
import { useLogout } from "../../hooks/useLogout"
import { HiOutlineLogout } from "react-icons/hi";



export default function Navbar({showAuth}:{showAuth?:boolean}) {
  const { user } = useAuth()
  const { logout } = useLogout()
  const [menu, setMenu] = useState(false)

  const handleNavbg = () => {
    const nav = document.getElementById("navBar")
    if(nav){
      if (window.scrollY >=  70) nav.style.position = "fixed"
      else { nav.style.position = "" }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleNavbg)
  }, [])



  return ( 
    <div className={s.ctn} id="navBar">
      <div className={s.wrp}>
        <div className={s.logo}>     
          <Link href="/">
                <Image  src={logo} width={80} height={35} alt="logo"/>
          </Link>     
        </div>

        <Menu/>

        {user && 
          <div className={s.profile} onClick={() => setMenu(!menu)}>
            <div className={s.image}><Image src={user.photoURL} width={35} height={35} alt="Avatar!"/></div>
            <HiMiniChevronDown size="1em" />
            {menu && 
              <div className={s.menu}>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/invest">Invest</Link>
                <Link href="/about">Company</Link>
                <Link href="/contact">Contact</Link>
                <button className="logout" onClick={logout}> Logout <HiOutlineLogout size="1.3em"/></button>
              </div>
            }
          </div>
        }

        {!user && 
          <div className={s.profile}>
            {menu && 
              <div className={s.menu}>
                <Link href="/invest">Invest</Link>
                <Link href="/about">Company</Link>
                <Link href="/contact">Contact</Link>
              </div>
            }
            {!user &&
            <>
              {showAuth &&
                <div className={s.signup}>
                  <Link href="/login">Login</Link>
                  <Link href="/signup">Sign up</Link>
                </div>
              }
            </>
            }
          </div>
        }
      </div>
    </div>
  )
}

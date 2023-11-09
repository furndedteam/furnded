import React from 'react'
import styles from "./Footer.module.css"
import Link from "next/link"
import { FaFacebookSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";




export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.services}>
          <div className={styles.head}>
            <h4>Services</h4>
            <span></span>
          </div>
          <div className={styles.links}>
            <Link href="/invest">Cryptocurrency</Link>
            <Link href="/invest">Invest</Link>
          </div>
        </div>
        <div className={styles.company}>
          <div className={styles.head}>
            <h4>Company</h4>
            <span></span>
          </div>
          <div className={styles.links}>
            <Link href="/about">About-Us</Link>
            <Link href="/about">Summary</Link>
            <Link href="/about">T&C</Link>
          </div>
        </div>
        <div className={styles.contact}>
          <div className={styles.head}>
            <h4>Contact</h4>
            <span></span>
          </div>
          <div className={styles.links}>
            <Link href="/"><span><FaFacebookSquare size="1.5em" color='#f8fcff'/> Facebook</span></Link>
            <Link href="/"><span><FaWhatsappSquare size="1.5em" color='#f8fcff'/>WhatsApp</span></Link>
            <Link href="/"><span><FaMailBulk size="1.4em" color='#f8fcff'/>Email</span></Link>
          </div>
        </div>
      </div>
      
      
      <div className={styles.copyright}><p>Copyright ©2015 Furnded Inc. All rights reserved.</p></div>
    </div>
  )
}

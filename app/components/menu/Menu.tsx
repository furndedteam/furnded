import Link from "next/link"
import styles from "./Menu.module.css"

export default function Menu() {
  return (
    <div className={styles.container} >
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <span></span>
      </div>
      <div className={styles.links}>
        <Link href="/invest">Pricing</Link>
        <span></span>
      </div>
      <div className={styles.links}>
        <Link href="/about">About</Link>
        <span></span>
      </div>
      <div className={styles.links}>
        <Link href="/contact">Contact</Link>
        <span></span>
      </div>
    </div>
  )
}
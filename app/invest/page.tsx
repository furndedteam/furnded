import styles from "./invest.module.css";
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import InvestmentCard from "../components/investmentCard/InvestmentCard";
import { plans } from "../utils/text"
import WhatsAppBtn from "../components/whatsAppBtn/WhatsAppBtn";


export default function Index() {


  return (
    <div className={styles.container}>
      <Navbar showAuth={true}/>
      <div className={styles.hero}>
        <h1>Choose An  <span>Investment</span> Plan For Your Portfolio</h1>
        <div className={styles.wrap}>
          <div className={styles.arrow}></div>
        </div>
      </div>
      <div className={styles.text}>
        <h1>Benefits and pricing</h1>
        <p>The simple way to grow your money like the world&apos;s most sophisticated investors.</p>
      </div>
      <InvestmentCard plans={plans}/>
      <Footer />
      <WhatsAppBtn />
    </div>
  )
}

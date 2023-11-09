import styles from "./about.module.css"
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import { about } from "../utils/text"
import WhatsAppBtn from "../components/whatsAppBtn/WhatsAppBtn"
import ChartSlide from "../components/chartSlide/ChartSlide"

export default function Index() {
  const aboutUs = about[0]
  const whatWeDo = about[1]

  return (
    <div>
      <Navbar showAuth={true} />
      <div className={styles.hero}>
      <h1>We<span>&apos;</span>re building the world <span>&apos;</span>s most human financial company.</h1>
        <div className={styles.wrap}>
          <div className={styles.arrow}></div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.text}>
          <h1>{aboutUs.title}</h1>
          <p>
            {aboutUs.span.map(text => <span key={text}>{text}</span>)}
          </p>
        </div>
        <div className={styles.image}>
          <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/thefuture-b0f19.appspot.com/o/retirement.webm?alt=media&token=cd7318bd-b928-46e6-989d-5b61b82bb99f" 
              type="video/webm" 
              />
          </video>
        </div>
      </section>

      <section className={styles.section2}>
        <div className={styles.image}>
          <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/thefuture-b0f19.appspot.com/o/risk-tolerance-en-1125.webm?alt=media&token=14a7fa50-6ecc-419b-bb9a-a7f6e12b5124" 
              type="video/webm" 
              />
          </video>
        </div>

        <div className={styles.text}>
          <h1>{whatWeDo.title}</h1>
          <p>
            {whatWeDo.span.map(text => <span key={text}>{text}</span>)}
          </p>
        </div>
      </section>
      <Footer />
      <ChartSlide />
      <WhatsAppBtn />
    </div>
  )
}

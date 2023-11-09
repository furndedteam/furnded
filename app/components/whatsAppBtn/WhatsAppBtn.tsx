import s from './WhatsAppBtn.module.css'
import { IoLogoWhatsapp } from "react-icons/io"

export default function WhatsAppBtn() {
  return (
    <div className={s.ctn}>
      <a href='https://wa.me/message/TFU7HVOSZ5NRK1'>
        <IoLogoWhatsapp />
        <p>Contact Us</p>
      </a>
    </div>
  )
}

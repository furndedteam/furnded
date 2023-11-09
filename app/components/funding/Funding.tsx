import { useState, useRef } from "react";
import { wallet } from "../../utils/text"
import Image from "next/image"
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { VscCommentDiscussion } from "react-icons/vsc";
import { VscCopy } from "react-icons/vsc";
import styles from "./Funding.module.css";


export default function Funding() {
  const [coin, setCoin] = useState<number>(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);


  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setCoin(Number(e.target.value))
  }


  const copyToClipBoard = async (copyMe:string) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false)
      }, 3000);
    } catch (err:any) {
      setCopySuccess(err.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.coinSelect}>
          <label>Coin</label>
          <select value={coin} onChange={handleChange} style={{fontSize: ".8rem"}}>
            <option value={0}>Bitcoin</option>
            <option value={1}>Ethereum</option>
            <option value={2}>Usdt</option>
          </select>
        </div>

        <div className={styles.qr}>
            <Image priority src={`/assets/qr${coin+1}.jpg`} width={200} height={200} layout='responsive' alt="QR code"/>
            <input type="text" ref={textAreaRef} value={wallet[coin].address} disabled/>
        </div>

        <div className={styles.text}>
          <p>Send only <span>{wallet[coin].title}({wallet[coin].network}) </span>to this address, sending any other coin may result to permanent loss</p>
        </div>

        <div className={styles.icons}>
          <div className={styles.icon}>
            <a>
              <VscCopy onClick={() => copyToClipBoard(wallet[coin].address)} size="4em" style={copySuccess && {color: "#00e99b"}}/>
            </a>
            {!copySuccess && <p>Copy</p>}
            {copySuccess && <p>Copied!</p>}
          </div>
          <div className={styles.icon}>
            <a href={wallet[coin].link}>
              <VscWorkspaceTrusted size="3.5em"/>
            </a>
            <p>Trust-Wallet</p>
          </div>
          <div className={styles.icon}>
            <a>
              <VscCommentDiscussion size="3.5em"/>
            </a>
            <p>Contact-Us</p>
          </div>
        </div>

      </div>
    </div>
  )
  }

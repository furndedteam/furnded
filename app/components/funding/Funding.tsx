import { useState, useRef } from "react";
import { VscCopy } from "react-icons/vsc";
import s from "./Funding.module.css";
import { MdCircle } from "react-icons/md";
import dateFormat from "dateformat";
import useAuth from "../../hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { coin } from "@/app/utils/text";
import { BsFileEarmarkImage } from "react-icons/bs";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';


export default function Funding() {
  const [copy, setCopy] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [amount, setAmount] = useState(20);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<any>(null);
  const [pending, setPending] = useState<boolean|string>(false);
  const [page, setPage] = useState(1);
  const [coinIndex, setCoinIndex] = useState(0);
  const textAreaRef = useRef(null);
  const router = useRouter();
  const { user } = useAuth()
  const [selectedImage, setSelectedImage] = useState<any>(null);

  

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleClick =  (e:string) => {
    if (e === "copy") setCopy(true)
  }

  const btnClick =  (e:string) => {
    if (e === "back") router.push("/dashboard")
    if (e === "qr") setPage(2)
    if (e === "upload") setPage(3)
  }

  const copyToClipBoard = async (copyMe:string) => {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(true)
      setTimeout(() => {
        setCopySuccess(false)
        setCopy(false)
      }, 3000)
  }

  const pageNavigation = (e:string) => {
    if (e === "deposit") setPage(1)
    if (e === "qr") setPage(2)
    if (e === "upload") setPage(3)
  }

  const handleCoin = (e:any) => {
    setCoinIndex(Number(e.target.value))
  }

  const handleSendDeposit = async (e:any) => {
    e.preventDefault()
    setPending(false)
    setSuccess(null)
    setError(null)

    const depositData = {
      amount,
      name:user.displayName,
      email: user.email,
      date: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss"),
      title: `Deposit from ${user.email}`,
      image: selectedImage,
      type: "deposit",
      status: "pending"
    };

    const transactionData = {...depositData, image: null}

    try{
      setPending(true);
      
      await addDoc(collection(db, "transactions"), transactionData);

      const res = await fetch(`/api/deposit`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(depositData),
      })
    
      const data = await res.json()
      
      if(res.ok){
        const res = await fetch(`/api/userDeposit`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(transactionData),
        })
      
        const data2 = await res.json()
        
        if(res.ok){
        setSuccess('Deposit Sent Successfully and Pending Approval.')
        setPending(false)
        } else throw new Error(data2.message)
      } 
      else throw new Error(data.message)
    } catch (err: any) { 
      setError('Something went wrong, try again later...') 
      setPending(false)
    }
  }

  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <div className={s.current}>
          <MdCircle onClick={() => pageNavigation("deposit")} size="1.2rem" style={page === 1 ? {color: "#05C169"} : {}}/>
          <MdCircle onClick={() => pageNavigation("qr")} size="1.2rem" style={page === 2 ? {color: "#05C169"} : {}}/>
          <MdCircle onClick={() => pageNavigation("upload")} size="1.2rem" style={page === 3 ? {color: "#05C169"} : {}}/>
        </div>
      </div>
      {page === 1 &&
      <div className={s.amount}>
        <h2>Deposit</h2>
        <input placeholder="Enter Amount" onChange={(e:any) => setAmount(e.target.value)} value={amount} type="number"/>
        <button className='bigBtn bigBtn2 full' style={{...overwrite}} onClick={() => btnClick("qr")}>Deposit  <span style={{...span}}>&rarr;</span></button>
        <button className="bigBtn bigBtn2 full" style={{...overwrite}} onClick={() => btnClick("back")}>
          <span style={{...span2}}>&larr;</span> Back To Dashboard
        </button>
      </div>
      }

      {page === 2 &&
        <div className={s.CryptoFund}>
          <label>Coin</label>
          <select onChange={handleCoin}>
            <option value={0}>Bitcoin</option>
            <option value={1}>USDT Trc20</option>
            <option value={2}>USDT Bep20</option>
            <option value={3}>USDT Erc20</option>
          </select>

          <div className={s.qr}>
              <div id="qr" className={s.imgCtn}>
                <Image src={`/assets/qr${coinIndex+1}.jpg`} alt="QR" width="400" height="400"/>
              </div>
              <div className={s.address}>
                  <input
                  type="text"
                  ref={textAreaRef}
                  value={coin[coinIndex].address}
                  disabled
                  />
                <div className={s.icon}>
                  <a href="#icon" onClick={() => handleClick("copy")}>
                    <VscCopy onClick={() => copyToClipBoard(coin[coinIndex].address)} size="4em" style={copy ? {color: "#00e99b"} : {}}/>
                  </a>
                  {!copySuccess && <p>Copy</p>}
                  {copySuccess && <p>Copied!</p>}
                </div>
              </div>
          </div>

          <div className={s.text}>
            <p>Send only <span>{coin[coinIndex].title}({coin[coinIndex].network}) </span>to this address, sending any other coin may result to permanent loss</p>
          </div>

          <button className="bigBtn bigBtn2 full" style={{...overwrite}} onClick={() => btnClick("back")}>
            <span style={{...span2}}>&larr;</span> Back To Dashboard
          </button>
          <button className="bigBtn bigBtn2 full" style={{...overwrite}} onClick={() => btnClick("upload")}>
            Upload Payment Proof <span style={{...span}}>&rarr;</span>
          </button>
        </div>
      }

      {page === 3 &&
        <div className={s.imgCtn}>
          <div className={s.imgWrp}>
            <BsFileEarmarkImage />
            <input type="file" accept="image/*" onChange={handleImageChange}/>
            {selectedImage && (
              <img  src={selectedImage} alt="Selected"/>
            )}
          </div>

          <button className="bigBtn bigBtn2 full" style={{...overwrite}} onClick={handleSendDeposit}>{pending ? "loading..." : "Save Deposit"}</button>
          {error && <p className='formError res'>{error}</p>}
          {success && <p className='formSuccess res'>{success}</p>}
        </div>
      }
    </div>
  )}



  const overwrite = {
    background: "none",
    border: "1px solid #000000",
    color: "#000000",
    borderRadius: "20px",
    padding: "19px"
  }

  const span = {
    fontSize: "1.5em",
    paddingLeft: "1em",
  }

  const span2 = {
    fontSize: "1.5em",
    paddingRight: "1em",
  }

  const someCtns = {
    minHeight: "auto",
    border: "none",
  }


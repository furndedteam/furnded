"use client"
import { ReactNode, useEffect, useState } from "react";
import { MdOutlineCandlestickChart } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import s  from "./BalCard.module.css";
import { NextPage } from "next";

export type BalCardData = {
  deposit: ReactNode,
  profit: ReactNode,
  withdraw: ReactNode,
}

interface IBalCardData {
  bal: BalCardData
}


const BalCard: NextPage<IBalCardData> = ({ bal }) => {
  const [portfolio, setPortfolio] = useState('deposit');
  const [deposit, setDeposit] = useState(true);
  const [profit, setProfit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [mobile, setMobile] = useState(false);

  
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 600) {
        setMobile(false);
      } else {
        setMobile(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "deposit") {
      setDeposit(true)
      setProfit(false)
      setWithdraw(false)
      setPortfolio(e.target.value)
    }
    if (e.target.value === "profit") {
      setProfit(true)
      setWithdraw(false)
      setDeposit(false)
      setPortfolio(e.target.value)
    }
    if (e.target.value === "withdraw") {
      setWithdraw(true)
      setProfit(false)
      setDeposit(false)
      setPortfolio(e.target.value)
    }
  }

  const getColor = (b: ReactNode, o:ReactNode) =>  b !== 0 ? `rgba(0, 233, 105, ${o})` : `rgba(255, 0, 0, ${o})`

  const calLength = (e:ReactNode) => {
    if(bal && e){
      if(e.toString().length > 5) return true
      else return false
    }
  }


  return (
    <>
      {mobile &&
      <div className={s.portfolioSelect}>
        <select value={portfolio} onChange={handleChange}>
          <option value={"deposit"}>Deposit</option>
          <option value={"profit"}>Profit</option>
          <option value={"withdraw"}>Withdraw</option>
        </select>
      </div>
      }


      {!mobile &&
      <div className={s.container}>
        <div className={s.card}>
          <div className={s.icons}>
            <div className={`${s.iconWrp} ${s.iconWrpBg}`}><GiWallet /></div>
            <div className={s.iconWrp} style={{ background: getColor(bal?.deposit, "0.12")}}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.deposit, "1")}}/>
            </div>
          </div>
          <div className={s.text}>
            <h2 style={calLength(bal?.deposit) ? {fontSize: "3.1rem"} : {}}>
              <span>$</span>
              {bal?.deposit? Number(bal?.deposit).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00'}
          </h2>
            <p>Deposit</p>
          </div>
        </div> 

        <div className={s.card}>
          <div className={s.icons}>
            <div className={`${s.iconWrp} ${s.iconWrpBg}`}><GiWallet /></div>
            <div className={s.iconWrp} style={{ background: getColor(bal?.profit, "0.12")}}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.profit, "1")}}/>
            </div>
          </div>
          <div className={s.text}>
            <h2 style={calLength(bal?.profit) ? {fontSize: "3.1rem"} : {}}>
              <span>$</span>
              {bal?.profit? Number(bal?.profit).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00'}
            </h2>
            <p>Profits</p>
          </div>
        </div>

        <div className={s.card}>
          <div className={s.icons}>
            <div className={`${s.iconWrp} ${s.iconWrpBg}`}><GiWallet /></div>
            <div className={s.iconWrp} style={{ background: getColor(bal?.withdraw, "0.12")}}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.withdraw, "1")}}/>
            </div>
          </div>
          <div className={s.text}>
            <h2 style={calLength(bal?.withdraw) ? {fontSize: "3.1rem"} : {}}>
              <span>$</span>
              {bal?.withdraw? Number(bal?.withdraw).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00'}
            </h2>
            <p>Withdraws</p>
          </div>
        </div>
      </div>
      }




      {mobile &&
      <div className={s.container}>
        {deposit &&
        <div className={s.card}>
          <div className={s.icons}>
            <div className={`${s.iconWrp} ${s.iconWrpBg}`}><GiWallet /></div>
            {deposit && 
            <div className={s.iconWrp} style={{background: getColor(bal?.deposit, "0.12")}}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.deposit, "1")}}/>
            </div>
            }
            {profit && 
            <div className={s.iconWrp} style={{background: getColor(bal?.profit, "0.12")}}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.profit, "1")}}/>
            </div>
            }
            {withdraw && 
            <div className={s.iconWrp} style={{background: getColor(bal?.withdraw, "0.12")}}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.withdraw, "1")}}/>
            </div>
            }
          </div>
          <div className={s.text}>
            <h2 style={calLength(bal?.deposit) ? {fontSize: "3.1rem"} : {}}>
              <span>$</span>
              {bal?.deposit? Number(bal?.deposit).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00'}
            </h2>
            <p>Deposit</p>
          </div>
        </div> 
        }


        {profit &&
        <div className={s.card}>
          <div className={s.icons}>
            <div className={`${s.iconWrp} ${s.iconWrpBg}`}><GiWallet /></div>
            {deposit && 
            <div className={s.iconWrp} style={{background: getColor(bal?.deposit, "0.12")}}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.deposit, "1")}}/>
            </div>
            }
            {profit && 
            <div className={s.iconWrp} style={{background: getColor(bal?.profit, "0.12")}}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.profit, "1")}}/>
            </div>
            }
            {withdraw && 
            <div className={s.iconWrp} style={{background: getColor(bal?.withdraw, "0.12")}}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.withdraw, "1")}}/>
            </div>
            }
          </div>
          <div className={s.text}>
            <h2 style={calLength(bal?.profit) ? {fontSize: "3.1rem"} : {}}>
              <span>$</span>
              {bal?.profit? Number(bal?.profit).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00'}
            </h2>
            <p>Profits</p>
          </div>
        </div>
        }



        {withdraw &&
        <div className={s.card}>
          <div className={s.icons}>
            <div className={`${s.iconWrp} ${s.iconWrpBg}`}><GiWallet /></div>
            {deposit && 
            <div className={s.iconWrp}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.deposit, "1")}}/>
            </div>
            }
            {profit && 
            <div className={s.iconWrp}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.profit, "1")}}/>
            </div>
            }
            {withdraw && 
            <div className={s.iconWrp}>
              <MdOutlineCandlestickChart size="1.5em" style={{ color: getColor(bal?.withdraw, "1")}}/>
            </div>
          }
          </div>
          <div className={s.text}>
            <h2 style={calLength(bal?.withdraw) ? {fontSize: "3.1rem"} : {}}>
              <span>$</span>
              {bal?.withdraw? Number(bal?.withdraw).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00'}
            </h2>
            <p>Withdraws</p>
          </div>
        </div>
        }
      </div>
      }
    </>
  )
}


export default BalCard
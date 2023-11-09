"use client"
import { useEffect, useState } from 'react';
import s from './AutoCount.module.css'

const AutoCount = () => {
  const [startCount, setStartCount] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalProfits, setTotalProfits] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);

  const handleScroll = () => {
    const element = document.getElementById('counterSection');
    if (
      element &&
      window.scrollY > element.offsetTop - window.innerHeight / 2 &&
      window.scrollY < element.offsetTop + element.offsetHeight
    ) {
      setStartCount(true);
      window.removeEventListener('scroll', handleScroll);
    } else {
      setStartCount(false)
      setTotalDeposits(0)
    }
  };

  const startCountAnimation = () => {
    let counter = 0;
    const increment = Math.ceil(5401 / 100);
    const intervalId = setInterval(() => {
      counter += increment;
      setTotalUsers(counter > 5401 ? 5401 : counter);
      if (counter >= 5401) clearInterval(intervalId);
    }, 100);

    let counter2 = 0;
    const increment2 = Math.ceil(760002900 / 100);
    const intervalId2 = setInterval(() => {
      counter2 += increment2;
      setTotalProfits(counter2 > 760002900 ? 760002900 : counter2);
      if (counter2 >= 760002900) clearInterval(intervalId2);
    }, 100);

    let counter3 = 0;
    const increment3 = Math.ceil(60048000 / 100);
    const intervalId3 = setInterval(() => {
      counter3 += increment3;
      setTotalDeposits(counter3 > 60048000 ? 60048000 : counter3);
      if (counter3 >= 60048000) clearInterval(intervalId3);
    }, 100);

    let counter4 = 0;
    const increment4 = Math.ceil(25000130 / 100);
    const intervalId4 = setInterval(() => {
      counter4 += increment4;
      setTotalWithdrawal(counter4 > 25000130 ? 25000130 : counter4);
      if (counter4 >= 25000130) clearInterval(intervalId4);
    }, 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (startCount) startCountAnimation();
  }, [startCount]);

  return (
    <div id="counterSection" className={s.ctn}>
      <div className={s.wrp}>
        <div><p>Active Users</p> <h2>{totalUsers}</h2></div>
        <div><p>Total Deposits</p> <h2>{totalDeposits}</h2></div>
        <div><p>Total Profits</p> <h2>{totalProfits}</h2></div>
        <div><p>Total Withdrawal</p> <h2>{totalWithdrawal}</h2></div>
      </div>
    </div>
  );
};

export default AutoCount;

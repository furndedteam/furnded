"use client"
import styles from '../dashboard.module.css';
import useAuth from '@/app/hooks/useAuth';
import useCollection from '@/app/hooks/useCollection';

// importing components
import SideNav from '@/app/components/sideNav/SideNav';
import BalCard from '@/app/components/balCard/BalCard';
import Charts from '@/app/components/charts/Charts';
import Funding from '@/app/components/funding/Funding';
import InvestmentCard from '@/app/components/investmentCard/InvestmentCard';
import ReferralText from '@/app/components/referralText/ReferralText';
import BuiltWith from '@/app/components/builtWith/BuiltWith';
import Profile from '@/app/components/profile/Profile';
import MiningOverview from '@/app/components/miningOverview/MiningOverview';
import CryptoChart from '@/app/components/cryptoChart/CryptoChart';
import MarketPower from '@/app/components/marketPower/MarketPower';
import Indices from '@/app/components/indices/Indices';
import CrossRates from '@/app/components/crossRates/CrossRates';
import IndicesFuture from '@/app/components/indicesFuture/IndicesFuture'
import HeatMap from '@/app/components/heatMap/HeatMap';

// importing router functions
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'

// importing plans
import { plans } from '@/app/utils/text';
import { ImSpinner2 } from 'react-icons/im';



export default function Dashboard() {
  const { data:doc, isPending } = useCollection('profile', false, true);
  const { authIsReady, user } = useAuth()
  const { page } = useParams();
  const router = useRouter()

  useEffect(() => {
    const chatDiv = document.getElementById('tidio-chat')
    if(chatDiv){
      chatDiv.style.display = 'none';
    }

    if(authIsReady){
      if(user && user.email === "help@genesis-experts.com"){
        router.push('/admin')
      }

      if(!user){
        router.push('/login')
      }
    }

    return () => {
      if(chatDiv){
        chatDiv.style.display = 'block';
      }
    }

  }, [authIsReady, user, router.push])



  if(isPending){
    return (
      <div className="spinnerCtn">
        <div className="spinner">
        <ImSpinner2 className="spin spinBig" color="#1649ff"/>
        </div>
      </div>
    )
  }




  return ((authIsReady && user && user?.email !== "help@genesis-experts.com" && doc) &&
    <div className={styles.ctn}>
      <div className={styles.side}>
        <SideNav />
      </div>
      {(page === undefined || page === 'home') &&
      <div className={styles.main}>
        <BalCard />
        <ReferralText />
        <BuiltWith />
        <MiningOverview />
        <CryptoChart />
      </div>
      }


      {page === 'fund' &&
      <div className={styles.main}>
        <Funding />
      </div>
      }


      {page === 'invest' &&
      <div className={styles.main}>
        <InvestmentCard plans={plans}/>
      </div>
      }


      {page === 'profile' &&
      <div className={styles.main}>
        <Profile data={doc}/>
      </div>
      }

      {page === 'chart' &&
      <div className={styles.main}>
        <Charts />
        <MarketPower />
        <Indices />
        <CrossRates />
        <IndicesFuture />
        <CryptoChart />
        <HeatMap />
      </div>
      }
      
    </div>
  )
}

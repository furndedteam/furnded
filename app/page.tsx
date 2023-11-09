// import { useEffect, useState } from 'react'
import Footer from './components/footer/Footer'
import Hero from './components/hero/Hero'
import Navbar from './components/navbar/Navbar'
import SectionOne from './components/sectionOne/SectionOne'
import Head from 'next/head'
import { plans, testimonials, texts, withdrawals } from './utils/text' 
import WhatsAppBtn from './components/whatsAppBtn/WhatsAppBtn'
import InvestmentCard from './components/investmentCard/InvestmentCard'
import GeneralWithdraws from './components/generalWithdraws/GeneralWithdraws'
import Testimonials from './components/testimonials/Testimonials'
import ChartSlide from './components/chartSlide/ChartSlide'

export default function Home() {

  return (
    <>
      <Head>
        <title>For the future</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar showAuth={true}/>
      <Hero />
      <SectionOne data={texts[0]} reversed={false}/>
      <SectionOne data={texts[1]} reversed={true}/>
      <SectionOne data={texts[2]} reversed={false}/>
      <SectionOne data={texts[3]} reversed={true}/>
      <InvestmentCard plans={plans} stock={null}/>
      <Testimonials data={testimonials}/>
      <Footer />
      <WhatsAppBtn />
      <GeneralWithdraws withdrawals={withdrawals}/>
      <ChartSlide />
    </>
  )
}

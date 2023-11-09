"use client"
import s from "./Hero.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// @ts-ignore
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image"
import cryptoBG from "@/public/assets/cryptobg.jpg"
import cryptoBG2 from "@/public/assets/cryptobg2.jpg"
import { useRouter } from 'next/navigation'
import { HiArrowNarrowRight } from "react-icons/hi";


export default function Hero() {
  const router = useRouter()

  const handleRoute = (e:string) => {
    router.push(e)
  }



  return (
    <div className={s.hero}>
      <Swiper
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          speed={700}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Navigation, Pagination]}
          className={s.mySwiper}
        >
          <SwiperSlide className={s.swiperslides}>
            <div className={s.img}>
              <Image placeholder="blur" src={cryptoBG} fill style={{objectFit: "cover"}} quality={100} alt="cryptocurrency"/>
            </div>
            <div className={s.context}>
              <h1>Invest In Crypto</h1>
              <button onClick={() => handleRoute("/invest")}><span>Invest</span><HiArrowNarrowRight /></button>
            </div>
          </SwiperSlide>

          <SwiperSlide className={s.swiperslides}>
            <div className={s.img}>
              <Image placeholder="blur" src={cryptoBG2} fill style={{objectFit: "cover"}} quality={100} alt="cryptocurrency"/>
            </div>
            <div className={s.context}>
              <h1>Best Way To Save</h1>
              <button onClick={() => handleRoute("/invest")}><span>Invest</span><HiArrowNarrowRight /></button>
            </div>
          </SwiperSlide>
        </Swiper>
    </div>
  );
}

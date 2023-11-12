import s from './Map.module.css'
import mapIMG from '../../assets/map.png'


export default function Map() {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <img src={mapIMG} alt='map'/>
      </div>
    </div>
  )
}

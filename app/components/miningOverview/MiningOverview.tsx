import styles from './MiningOverview.module.css';
import activeUsers from '../../../public/assets/active_users.svg';
import overview from '../../../public/assets/mining_chart.svg';
import Image from 'next/image';

export default function MiningOverview() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image src={activeUsers} width={400} height={500} alt="active users"/>
      </div>
      <div className={styles.right}>
        <Image src={overview} width={400} height={500} alt="mining overview"/>
      </div>
    </div>
  )
}

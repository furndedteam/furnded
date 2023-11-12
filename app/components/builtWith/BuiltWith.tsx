import Image from 'next/image';
import styles from './BuiltWith.module.css';
import rocket from '../../../public/assets/rocket-white.png';

export default function BuiltWith() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftTextWrapper}>
          <p className={styles.title}>Built By Furnded</p>
          <h1 className={styles.subtitle1}>Furnded Dashboard</h1>
          <p className={styles.subtitle2}>From Trade, Investment&apos;s, cryptographic to complex elements, you will find the full documentation.</p>
          <p className={styles.subtitle3}>Best Trading & Investment Platform. <span>→</span></p>
        </div>

        <div className={styles.imageWrapper}>
          <Image src={rocket} alt="rocket" width={300} height={400} quality={100}/>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.text}>
          <h1>Work with the rockets</h1>
          <p>Furnded is based on an advanced sophisticated algorithm that allows generating unlimited binary and Minning signals which enable us to trade with most top 10 currency pairs in different time frames without limitations</p>
          <p className={styles.best}>Best Trading & Investment Platform. <span>→</span></p>
        </div>
      </div>
    </div> 
  )
}

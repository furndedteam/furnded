import styles from './BalCard.module.css';
import { MdOutlineShowChart, MdSavings } from 'react-icons/md';
import { FaCoins } from 'react-icons/fa';
import { GiCash, GiReceiveMoney } from 'react-icons/gi';
import { TiChartBar } from 'react-icons/ti';
import DashboardNav from '../../components/dashboardNav/DashboardNav';
import useCollection from '../../hooks/useCollection';

const order = ['balance', 'profit', 'investment', 'savings', 'withdrawal'];

export default function BalCard() {
  const { data } = useCollection('profile', false, true);
  const { bal } = data as any;

  return bal ? (
    <div className={styles.container}>
      <DashboardNav />
      <div className={styles.balCard}>
        {order.map((key) => {
          const value = bal[key];

          return (
            <div className={styles.card} key={key}>
              <div className={styles.cardheader}>
                <div className={styles.cardtitle}>
                  <h3>{key}</h3>
                </div>

                <div className={styles.isactive}>
                  {key === 'balance' && <FaCoins className={styles.circle} />}
                  {key === 'profit' && <GiCash className={styles.circle} />}
                  {key === 'savings' && <MdSavings className={styles.circle} />}
                  {key === 'withdrawal' && <GiReceiveMoney className={styles.circle} />}
                  {key === 'investment' && <TiChartBar className={styles.circle} />}
                </div>
              </div>

              <div className={styles.cardbody}>
                <h1>
                  <span>$</span>
                  {value ? value : 0.00}
                </h1>
                <MdOutlineShowChart
                  className={styles.chart}
                  style={value > 0 ? { color: '#05C169' } : { color: '#e90000' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
}
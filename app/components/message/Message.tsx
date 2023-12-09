import styles from './Message.module.css'
import { MdAddTask } from "react-icons/md";
import { MdInfo } from "react-icons/md";

type messageProps = {
  success: string|null,
  failed: string|null,
  setMessage: (p:boolean) => void
}

export default function Message({success, failed, setMessage}:messageProps) {
  return (
    <div className={styles.container} onClick={() => setMessage(false)}>
      <div className={styles.message}>
        {success && <p>{success} <MdAddTask size="1.5rem" color='#00e99b'/></p>}
        {failed && <p>{failed} <MdInfo size="1.5rem" color="red"/></p>}
      </div>
    </div>
  )
}
import { useNotification } from '../notificationStore'

const Notification = () => {
  const notification = useNotification()
  
  const style = {
    display: notification === '' ? 'none' : '',
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  return (
    <div style={style} data-testid="notification">
      {notification}
    </div>
  )
}

export default Notification

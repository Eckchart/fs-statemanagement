import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [message, setMessage] = useState('')

  const changeNotifState = (newMessage) => {
    setMessage(newMessage)
    setTimeout(() => {
      setMessage('')
    }, 5000);
  }

  return (
    <NotificationContext.Provider value={{ message, changeNotifState }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

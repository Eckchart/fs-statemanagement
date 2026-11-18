import { useNotify } from '../hooks/useNotify'

const Notification = () => {
  const { message } = useNotify()
  
  const style = {
    display: message === '' ? 'none' : '',
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div data-testid="notification" style={style}>
      {message}
    </div>
  )
}

export default Notification

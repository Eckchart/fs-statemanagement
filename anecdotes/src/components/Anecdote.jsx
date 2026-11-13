import { useAnecdotesActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const Anecdote = ({ anecdote }) => {
  const { vote } = useAnecdotesActions()
  const { setNotification } = useNotificationActions()
  
  const handleVote = async () => {
    vote(anecdote.id)
    setNotification(`You voted '${anecdote.content}'`)
  }
  
  return (
    <div>
      <div>{anecdote.content}</div>

      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote

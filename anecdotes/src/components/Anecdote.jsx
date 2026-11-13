import { useAnecdotesActions } from '../anecdotesStore'
import { useNotificationActions } from '../notificationStore'


const Anecdote = ({ anecdote }) => {
  const { vote, remove } = useAnecdotesActions()
  const { setNotification } = useNotificationActions()
  
  const handleVote = async () => {
    vote(anecdote.id)
    setNotification(`you voted '${anecdote.content}'`)
  }
  
  return (
    <div>
      <div>{anecdote.content}</div>

      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
        {anecdote.votes === 0 &&
          <button onClick={() => remove(anecdote.id)}>delete</button>
        }
      </div>
    </div>
  )
}

export default Anecdote

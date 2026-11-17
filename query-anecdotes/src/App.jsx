import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const { anecdotes, isPending, isError, updateAnecdote } = useAnecdotes()

  if (isError) {
    return (
      <div>
        anecdote service not available due to problems in server
      </div>
    )
  }
  if (isPending) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  
  const handleVote = async (anecdote) => {
    updateAnecdote(anecdote)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App

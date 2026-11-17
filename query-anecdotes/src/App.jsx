import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useState, useEffect } from 'react'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    getAnecdotes().then(initialAnecdotes => setAnecdotes(initialAnecdotes))
  }, [])

  if (!anecdotes) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  
  const handleVote = async (anecdote) => {
    const updatedAnecdote = await updateAnecdote(
      { ...anecdote, votes: anecdote.votes + 1 }
    )
    setAnecdotes(anecdotes.map(curAnecdote =>
      curAnecdote.id === anecdote.id ? updatedAnecdote : curAnecdote
    ))
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

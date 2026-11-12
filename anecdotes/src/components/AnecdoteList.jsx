import Anecdote from './Anecdote'
import { useAnecdotes } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  
  // sorted in descending order by votes
  // Zustand state must not be mutated!
  const anecdotesSortedByVotes = anecdotes.toSorted((a1, a2) => a2.votes - a1.votes)
  
  return (
    <div>
      {anecdotesSortedByVotes.map((anecdote) =>
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      )}
    </div>
  )
}

export default AnecdoteList

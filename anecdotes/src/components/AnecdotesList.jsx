import Anecdote from './Anecdote'
import { useAnecdotes } from '../anecdotesStore'

const AnecdotesList = () => {
  const anecdotesFilteredAndSortedByVotes = useAnecdotes()
  
  return (
    <div>
      {anecdotesFilteredAndSortedByVotes.map((anecdote) =>
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      )}
    </div>
  )
}

export default AnecdotesList

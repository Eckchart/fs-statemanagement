import { createAnecdote } from '../requests'
import { useMutation } from '@tanstack/react-query'

const AnecdoteForm = () => {
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote
  })
  
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, votes: 0 })
    event.target.reset()
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

import anecdoteService from '../requests'

const AnecdoteForm = () => {
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    await anecdoteService.createAnecdote({ content, votes: 0 })
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

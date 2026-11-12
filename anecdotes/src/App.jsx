import { useAnecdotes, useAnecdotesActions, asObject } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
  const { add, vote } = useAnecdotesActions()

  const handleSubmit = (e) => {
    e.preventDefault()
    const inputFieldContent = e.target.anecdote.value
    add(asObject(inputFieldContent))
    e.target.reset()  // reset form
  }

  return (
    <div>
      <h2>Anecdotes</h2>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>

          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}

      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App

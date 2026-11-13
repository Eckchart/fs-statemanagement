import { useAnecdotesActions } from '../anecdotesStore'
import { useNotificationActions } from '../notificationStore'

const AnecdoteForm = () => {
  const { add } = useAnecdotesActions()
  const { setNotification } = useNotificationActions()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const inputFieldContent = e.target.anecdote.value
    add(inputFieldContent)
    setNotification(`You added '${inputFieldContent}'`)
    e.target.reset()  // reset form
  }

  return (
    <div>
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

export default AnecdoteForm

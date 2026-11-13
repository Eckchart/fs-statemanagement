import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import { useAnecdotesActions } from './anecdotesStore'
import { useEffect } from 'react'
import Notification from './components/Notification'

const App = () => {
  const { initialize } = useAnecdotesActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />

      <Filter />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  )
}

export default App

import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import { useAnecdotesActions } from './store'
import { useEffect } from 'react'

const App = () => {
  const { initialize } = useAnecdotesActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Filter />

      <h2>Anecdotes</h2>

      <AnecdotesList />
      <AnecdoteForm />
    </div>
  )
}

export default App

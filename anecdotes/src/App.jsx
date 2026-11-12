import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'

const App = () => (
  <div>
    <Filter />

    <h2>Anecdotes</h2>

    <AnecdotesList />
    <AnecdoteForm />
  </div>
)

export default App

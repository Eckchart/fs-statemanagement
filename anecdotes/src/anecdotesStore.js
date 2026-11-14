import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import anecdoteService from './services/anecdotes'

const useAnecdotesStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: async (content) => {
      const createdAnecdote = await anecdoteService.createNew(content)
      
      set((state) => ({ anecdotes: [...state.anecdotes, createdAnecdote] }))
    },
   
    vote: async (id) => {
      const anecdoteToUpdate = get().anecdotes.find(
        anecdote => anecdote.id === id
      )
      const updatedAnecdote = await anecdoteService.update(
        id,
        { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
      )
      
      set((state) => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? updatedAnecdote : anecdote)
      }))
    },

    setFilter: (newText) => set(() => ({ filter: newText })),

    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },

    remove: async (id) => {
      // returns the deleted anecdote
      await anecdoteService.remove(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }))
    }
  }
}))

// Btw, very obvious thing:
// ({ anecdotes, filter }) must EXACTLY match the property names of the
// 'useAnecdoteStore' hook (worst case can use destructured aliases).
const useAnecdotes = () => useAnecdotesStore(useShallow(({ anecdotes, filter }) =>
  anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

    // sorted in descending order by votes
    // Zustand state must not be mutated!
    .toSorted((a1, a2) => a2.votes - a1.votes)
))

const useAnecdotesActions = () => useAnecdotesStore((state) => state.actions)

export { useAnecdotes, useAnecdotesActions }

export default useAnecdotesStore

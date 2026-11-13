import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import anecdoteService from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: (anecdote) => set(
      (state) => ({
        anecdotes: [...state.anecdotes, anecdote]
      })
    ),
   
    vote: (id) => set(
      (state) => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
        )
      })
    ),

    setFilter: (newText) => set(() => ({ filter: newText })),

    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes: anecdotes }))
    }
  }
}))

// Btw, very obvious thing:
// ({ anecdotes, filter }) must EXACTLY match the property names of the
// 'useAnecdoteStore' hook (worst case can use destructured aliases).
const useAnecdotes = () => useAnecdoteStore(useShallow(({ anecdotes, filter }) =>
  anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
))

const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)

export { useAnecdotes, useAnecdotesActions, asObject }

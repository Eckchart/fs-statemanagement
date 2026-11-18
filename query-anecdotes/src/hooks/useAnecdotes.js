import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { useNotify } from './useNotify'

const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { changeNotifState } = useNotify()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false  // NO RETRIES ARE MADE
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,

    // the value of the parameter of 'onSuccess' is the value
    // that the function `mutationFn`, i.e. `updateAnecdote`
    // returns (i.e. the return value of `mutationFn`).
    onSuccess: (updatedAnecdote) => {
      const curAnecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], curAnecdotes.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      ))
    }
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,

    // the value of the parameter of 'onSuccess' is the value
    // that the function `mutationFn`, i.e. `createAnecdote`
    // returns (i.e. the return value of `mutationFn`).
    onSuccess: (createdAnecdote) => {
      const curAnecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], [...curAnecdotes, createdAnecdote])
      changeNotifState(`anecdote '${createdAnecdote.content}' created`)
    },

    onError: () => {
      changeNotifState('too short anecdote, must have length 5 or more')
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    updateAnecdote: (anecdote) => updateAnecdoteMutation.mutate({
      ...anecdote, votes: anecdote.votes + 1
    })
  }
}

export { useAnecdotes }

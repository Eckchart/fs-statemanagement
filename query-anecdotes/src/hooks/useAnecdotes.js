import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'

const useAnecdotes = () => {
  const queryClient = useQueryClient()

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

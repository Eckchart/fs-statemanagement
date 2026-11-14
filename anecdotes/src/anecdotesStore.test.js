import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdotesActions } from './anecdotesStore'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdotesActions', () => {
  it('state is initialized with the anecdotes returned by the backend', async () => {
    const mockAnecdotes = [
      {
        "id": "69",
        "content": "Content1",
        "votes": 0
      },
      {
        "id": "67",
        "content": "Content2",
        "votes": 69
      },
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
    const { result: anecdotesActions } = renderHook(() => useAnecdotesActions())

    await act(async () => {
      await anecdotesActions.current.initialize()
    })

    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toEqual(mockAnecdotes)
  })

  it('Anecdotes received from the store are sorted in descending order by votes', async () => {
    const mockAnecdotes = [
      {
        "id": "69",
        "content": "Content1",
        "votes": 0
      },
      {
        "id": "67",
        "content": "Content2",
        "votes": 69
      },
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
    const { result: anecdotesActions } = renderHook(() => useAnecdotesActions())

    await act(async () => {
      // initialize with mock anecdotes
      await anecdotesActions.current.initialize()
    })

    const { result } = renderHook(() => useAnecdotes())

    // performs a deep equality correctly
    expect(result.current[0]).toEqual(mockAnecdotes[1])
    expect(result.current[1]).toEqual(mockAnecdotes[0])
  })
})

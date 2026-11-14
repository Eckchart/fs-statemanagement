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
import useAnecdotesStore, { useAnecdotes, useAnecdotesActions } from './anecdotesStore'

beforeEach(() => {
  useAnecdotesStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdotesActions', () => {
  it('state is initialized with the anecdotes returned by the backend', async () => {
    // since useAnecdotes returns the anecdotes sorted in descending order
    // by number of votes, we should declare our mock anecdotes like that
    // to make our life easier.
    const mockAnecdotes = [
      {
        "id": "67",
        "content": "Content2",
        "votes": 69
      },
      {
        "id": "69",
        "content": "Content1",
        "votes": 0
      }
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
    useAnecdotesStore.setState({ anecdotes: mockAnecdotes })

    const { result } = renderHook(() => useAnecdotes())

    // performs a deep equality correctly
    expect(result.current[0]).toEqual(mockAnecdotes[1])
    expect(result.current[1]).toEqual(mockAnecdotes[0])
  })

  it('Anecdotes received from the store are filtered properly', async () => {
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
    useAnecdotesStore.setState({ anecdotes: mockAnecdotes, filter: '1' })

    const { result } = renderHook(() => useAnecdotes())

    // performs a deep equality correctly
    expect(result.current.length).toBe(1)
    expect(result.current[0].id).toEqual('69')
  })
})

import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      anecdoteToChange.votes++
    },
    append(state, action) {
      state.push(action.payload)
    },
    set(state, action) {
      return action.payload
    }
  }
})
export const { vote,  append, set } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(set(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(append(newAnecdote))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch(vote(updatedAnecdote.id))
  }
}
export default anecdoteSlice.reducer

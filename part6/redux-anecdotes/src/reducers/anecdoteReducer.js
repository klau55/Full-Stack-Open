import { createSlice } from '@reduxjs/toolkit'

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
    create(state, action) {
      //const content = asObject(action.payload)
      state.push(action.payload)
    },
    append(state, action) {
      state.push(action.payload)
    },
    set(state, action) {
      return action.payload
    }
  }
})

export const { vote, create, append, set } = anecdoteSlice.actions
export default anecdoteSlice.reducer

import axios from 'axios'

export const getAnecdotes = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}
export const createAnecdote = async ({ content }) => {
  const response = await axios.post('http://localhost:3001/anecdotes', { content, votes: 0 })
  return response.data
}
export const voteAnecdote = async (id) => {
  const response = await axios.get(`http://localhost:3001/anecdotes/${id}`)
  const anecdote = response.data
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const voteResponse = await axios.put(`http://localhost:3001/anecdotes/${id}`, updatedAnecdote)
  return voteResponse.data
}
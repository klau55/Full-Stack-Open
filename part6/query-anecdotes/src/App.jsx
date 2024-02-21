import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const App = () => {

  const result = useQuery({
    queryKey: 'anecdotes',
    queryFn: async () => {
      const response = await axios.get('http://localhost:3002/anecdotes')
      return response.data
    },
    retry: false
  })
  console.log(JSON.parse(JSON.stringify(result)))
  if (result.isLoading) {
    return <div>Loading...</div>
  }
  if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
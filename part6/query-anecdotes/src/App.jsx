import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false
  })
  if (result.isLoading) {
    return <div>Loading...</div>
  }
  if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }
  
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote.id)
    dispatch({ type: 'SET_NOTIFICATION', payload: `You voted for '${anecdote.content}'` })
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, 5000)
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

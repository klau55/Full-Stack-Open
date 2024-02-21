import { useQueryClient , useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'Error, anecdote must have 5+ letters' })
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })
    dispatch({ type: 'SET_NOTIFICATION', payload: `Anecdote ${content} created successfully` })
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, 5000)
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { set } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App
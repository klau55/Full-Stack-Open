import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { set } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(set(anecdotes)))
  }, [])

  return (
    <div>
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App
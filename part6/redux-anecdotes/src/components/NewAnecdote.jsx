import { useDispatch } from "react-redux"
import anecdoteService from "../services/anecdotes"

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const NewAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: "anecdotes/create",
      payload: NewAnecdote
    })
    dispatch({
      type: "notification/setNotification",
      payload: `you created '${content}'`
    })
    setTimeout(() => {
      dispatch({ 
        type: 'notification/setNotification', 
        payload: null
      })
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default NewAnecdote
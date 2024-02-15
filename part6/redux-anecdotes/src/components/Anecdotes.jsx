import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const Anecdote = ({anecdote, handleClick}) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const Anecdotes = () => {  
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(addVote(id))
    }
    const anecdotes =  useSelector(anecdotes => anecdotes.sort((a, b) => b.votes - a.votes))
    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
            <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => vote(anecdote.id)}
            />
        )}
        </div>
    )
    }
    export default Anecdotes
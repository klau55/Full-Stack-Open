import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import Filter from "./Filter"

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
    const anecdotes =  useSelector(({filter, anecdotes}) => {
        if (filter === "") {
            return anecdotes
            .sort((a, b) => b.votes - a.votes)
        }
        else {
            return anecdotes
            .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
        }        
    }   
    )
    return (
        <div>
        <h2>Anecdotes</h2>
        <Filter />
        {anecdotes.map(anecdote =>
            <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => dispatch(addVote(anecdote.id))}
            />
        )}
        </div>
    )
}
    export default Anecdotes
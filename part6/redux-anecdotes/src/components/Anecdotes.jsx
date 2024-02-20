import { useSelector, useDispatch } from "react-redux"
import Filter from "./Filter"
import Notification from "./Notification"
import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const Anecdote = ({anecdote, handleClick}) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes} votes
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
            .map(anecdote => anecdote)
            .sort((a, b) => b.votes - a.votes)
        }
        else {
            return anecdotes
            .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
        }        
    }   
    )
    const vote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote))
        dispatch(notify(`You voted for '${anecdote.content}'`, 5))


    }
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            {anecdotes.map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => vote(anecdote)}
                />
            )}
        </div>
    )
}
    export default Anecdotes
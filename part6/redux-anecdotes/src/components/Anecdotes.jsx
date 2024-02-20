import { useSelector, useDispatch } from "react-redux"
import Filter from "./Filter"
import Notification from "./Notification"

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
    const voteAnecdote = (anecdote) => {
        dispatch({
            type: "anecdotes/vote",
            payload: anecdote.id 
        })
        dispatch({
            type: "notification/setNotification",
            payload: `you voted for '${anecdote.content}'`
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
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            {anecdotes.map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => voteAnecdote(anecdote)}
                />
            )}
        </div>
    )
}
    export default Anecdotes
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, {set} from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})
anecdoteService.getAll().then(anecdotes =>
    store.dispatch(set(anecdotes))
)

  export default store
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            return notification
        },
        removeMessage(state, action) {
            state = null
            return state
        }
    }
})

export const { setNotification, removeMessage } = notificationSlice.actions

export const notify = (message, time) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeMessage())
        }, time * 1000)
    }
}

export default notificationSlice.reducer
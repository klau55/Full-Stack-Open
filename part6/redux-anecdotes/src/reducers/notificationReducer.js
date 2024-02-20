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

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer
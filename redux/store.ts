
import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '@/redux/dataSlice'
import userReducer from '@/redux/userSlice'

const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
  },
})

export default store
 
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

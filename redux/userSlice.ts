import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Post, UserProfile } from '@/types/type'

interface UserState {
  id: number
  data: UserProfile | null
  loading: boolean
  error: string | null
}

// Async thunk to fetch data based on the ID
export const fetchData = createAsyncThunk<UserProfile, number>(
  'data/fetchData',
  async (id) => {
    const response = await fetch(`/api/users/${id}`)
    const data = await response.json()
    return data
  }
)

const initialState: UserState = {
  id: 1, // Default ID set to 1
  data: null,
  loading: false,
  error: null,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: { 
    // Action to set a new ID
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch data'
      })
  },
})

export const { setId } = dataSlice.actions

export default dataSlice.reducer

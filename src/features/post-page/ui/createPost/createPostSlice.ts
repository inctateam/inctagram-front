import { Image } from '@/features/post-page/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  images: [] as Image[],
}

export const createPostSlice = createSlice({
  initialState: initialState,
  name: 'createPost',
  reducers: {
    addImage: (state, action: PayloadAction<{ image: Image }>) => {
      state.images.push(action.payload.image)
    },
  },
  selectors: {
    selectImages: state => state.images,
  },
})

export const createPostSliceActions = createPostSlice.actions
export const createPostSliceSelectors = createPostSlice.selectors

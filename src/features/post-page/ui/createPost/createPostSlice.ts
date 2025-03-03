import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  croppedImages: [] as string[],
  images: [] as string[],
}

export const createPostSlice = createSlice({
  initialState: initialState,
  name: 'createPost',
  reducers: {
    addImage: (state, action: PayloadAction<{ image: string }>) => {
      state.images.push(action.payload.image)
    },
    deleteImage: (state, action: PayloadAction<{ index: number }>) => {
      state.images.splice(action.payload.index, 1)
    },
    setCroppedImages: (state, action: PayloadAction<{ images: string[] }>) => {
      state.croppedImages = [...action.payload.images]
    },
    setImage: (state, action: PayloadAction<{ image: string; index: number }>) => {
      state.images[action.payload.index] = action.payload.image
    },
    setImages: (state, action: PayloadAction<{ images: string[] }>) => {
      state.images = [...action.payload.images]
    },
  },
  selectors: {
    selectCroppedImages: state => state.croppedImages,
    selectImages: state => state.images,
  },
})

export const createPostSliceActions = createPostSlice.actions
export const createPostSliceSelectors = createPostSlice.selectors

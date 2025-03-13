import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  draftImages: [] as string[],
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
    getImagesFromDraft: state => {
      state.images = state.draftImages
      state.draftImages = []
    },
    moveImagesToDraft: state => {
      state.draftImages = state.images
      state.images = []
    },
    setImage: (state, action: PayloadAction<{ image: string; index: number }>) => {
      state.images[action.payload.index] = action.payload.image
    },
    setImages: (state, action: PayloadAction<{ images: string[] }>) => {
      state.images = [...action.payload.images]
    },
  },
  selectors: {
    selectDraftImages: state => state.draftImages,
    selectImages: state => state.images,
  },
})

export const createPostSliceActions = createPostSlice.actions
export const createPostSliceSelectors = createPostSlice.selectors

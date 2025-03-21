import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  draftFilteredImages: [] as string[],
  draftImages: [] as string[],
  filteredImages: [] as string[],
  images: [] as string[],
}

export const createPostSlice = createSlice({
  initialState: initialState,
  name: 'createPost',
  reducers: {
    addImage: (state, action: PayloadAction<{ image: string }>) => {
      state.images.push(action.payload.image)
      state.filteredImages.push(action.payload.image)
    },
    deleteImage: (state, action: PayloadAction<{ index: number }>) => {
      state.images.splice(action.payload.index, 1)
      state.filteredImages.splice(action.payload.index, 1)
    },
    getImagesFromDraft: state => {
      state.images = state.draftImages
      state.filteredImages = state.draftFilteredImages
      state.draftImages = []
      state.draftFilteredImages = []
    },
    moveImagesToDraft: state => {
      state.draftImages = state.images
      state.draftFilteredImages = state.filteredImages
      state.images = []
      state.filteredImages = []
    },
    setFilteredImage: (state, action: PayloadAction<{ image: string; index: number }>) => {
      state.filteredImages[action.payload.index] = action.payload.image
    },
    setImage: (state, action: PayloadAction<{ image: string; index: number }>) => {
      state.images[action.payload.index] = action.payload.image
      state.filteredImages[action.payload.index] = action.payload.image
    },
    setImages: (state, action: PayloadAction<{ images: string[] }>) => {
      state.images = [...action.payload.images]
      state.filteredImages = [...action.payload.images]
    },
  },
  selectors: {
    selectDraftFilteredImages: state => state.draftFilteredImages,
    selectDraftImages: state => state.draftImages,
    selectFilteredImages: state => state.filteredImages,
    selectImages: state => state.images,
  },
})

export const createPostSliceActions = createPostSlice.actions
export const createPostSliceSelectors = createPostSlice.selectors

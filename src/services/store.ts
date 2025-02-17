import { useDispatch, useSelector, useStore } from 'react-redux'

import { createPostSlice } from '@/features/post-page/ui/createPost/createPostSlice'
import { instagramApi } from '@/services'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(instagramApi.middleware),
    reducer: combineSlices(instagramApi, createPostSlice),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

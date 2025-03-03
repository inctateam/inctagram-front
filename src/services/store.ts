import { useDispatch, useSelector, useStore } from 'react-redux'

import { createPostSlice } from '@/features/post-page/ui/createPost/createPostSlice'
import { geoApi } from '@/features/profile-settings-page/ui/servises/countriesAndCities.api'
import { instagramApi } from '@/services'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(instagramApi.middleware, geoApi.middleware),
    reducer: combineSlices(instagramApi, createPostSlice, geoApi),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
//
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppSelector = useSelector.withTypes<RootState>()
// export const useAppStore = useStore.withTypes<AppStore>()

// Типизация для useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Типизация для useSelector
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected): TSelected =>
  useSelector(selector)

// Типизация для useStore
export const useAppStore = () => useStore<AppStore>()

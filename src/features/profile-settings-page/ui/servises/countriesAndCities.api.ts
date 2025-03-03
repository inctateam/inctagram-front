import {
  CitiesResponse,
  Country,
  FormatedCity,
  FormatedCountry,
} from '@/features/profile-settings-page/ui/servises/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.NEXT_PUBLIC_OXILOR_API_KEY as string

export const geoApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://data-api.oxilor.com',
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${API_KEY}`)
      headers.set('Accept-Language', 'en')
      headers.set('Content-Type', 'application/json')

      return headers
    },
  }),
  endpoints: builder => ({
    getCities: builder.query<FormatedCity[], string>({
      query: selectCountry => `/rest/regions?countryCode=${selectCountry}`,
      transformResponse: (cities: CitiesResponse) => {
        return cities.edges
          .map(edge => ({
            countryCode: edge.node.countryCode,
            id: edge.node.id,
            label: edge.node.name,
            value: edge.node.name,
          }))
          .filter(
            (city, index, self) => index === self.findIndex(c => c.label === city.label) // Убираем дубликаты по имени
          )
      },
    }),
    getCountries: builder.query<FormatedCountry[], void>({
      keepUnusedDataFor: 3600,
      query: () => '/rest/countries?lng=en',
      transformResponse: (countries: Country[]) => {
        return countries.map(country => ({
          countryCode: country.countryCode,
          id: country.id,
          label: country.name,
          value: country.name,
        }))
      },
    }),
  }),
  reducerPath: 'geoApi',
})

export const { useGetCitiesQuery, useGetCountriesQuery } = geoApi

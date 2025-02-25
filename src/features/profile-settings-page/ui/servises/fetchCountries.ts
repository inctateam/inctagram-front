import { useCallback } from 'react'

import { handleRequestError } from '@/features/auth/utils/handleRequestError'

const API_KEY = process.env.NEXT_PUBLIC_OXILOR_API_KEY as string

export type PageInfo = {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
}
export type RegionNode = {
  continentCode: string
  countryCode: string
  division1Code: string
  division2Code: null | string
  division3Code: null | string
  division4Code: null | string
  id: string
  latitude: number
  longitude: number
  name: string
  parentRegions: { id: string; name: string }[]
  population: string
  timezone: string
  type: string
}
export type Edge = {
  cursor: string
  node: RegionNode
}
export type CitiesResponse = {
  edges: Edge[]
  pageInfo: PageInfo
}
export type Country = {
  continentCode: string
  countryCode: string
  division1Code: string
  division2Code: null | string
  division3Code: null | string
  division4Code: null | string
  id: string
  latitude: number
  longitude: number
  name: string
  parentRegions: Array<{ id: string; name: string }>
  population: string
  timezone: string
  type: 'country' // Тип всегда 'country' в этом случае
}
export type FormatedCountry = {
  countryCode: string
  id: string
  label: string
  value: string
}
export type FormatedCity = {
  countryCode?: string
  id: string
  label: string
  value: string
}

export const fetchCountries = async () => {
  console.log('fetchCountries')
  try {
    const response = await fetch(`https://data-api.oxilor.com/rest/countries?lng=en`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
    const data: Country[] = await response.json()
    const countries: FormatedCountry[] = data.map(country => ({
      countryCode: country.countryCode,
      id: country.id,
      label: country.name,
      value: country.name,
    }))

    return countries
  } catch (error) {
    handleRequestError(error)
    throw new Error('Error loading countries')
  }
}
export const fetchCities = async (selectCountry: string) => {
  if (!selectCountry) {
    return [] // Возвращаем пустой массив, если страна не выбрана
  }
  try {
    const response = await fetch(
      `https://data-api.oxilor.com/rest/regions?countryCode=${selectCountry}`,
      {
        headers: {
          'Accept-Language': 'en',
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data: CitiesResponse = await response.json()

    console.log('CitiesResponse', data)
    const cities: FormatedCity[] = data.edges
      .map(edge => ({
        countryCode: edge.node.countryCode,
        id: edge.node.id,
        label: edge.node.name,
        value: edge.node.name,
      }))
      .filter(
        (city, index, self) => index === self.findIndex(c => c.label === city.label) // Убираем дубликаты по имени
      )

    return cities
  } catch (error: unknown) {
    handleRequestError(error)
    throw new Error('Error loading cities')
  }
}

import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { useLocale } from 'next-intl'

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
export type FormatedCountry = Pick<Country, 'countryCode' | 'id' | 'name'>

export const fetchCountries = async (locale: string) => {
  try {
    const response = await fetch(`https://data-api.oxilor.com/rest/countries`, {
      headers: {
        Accept: 'application/json',
        'Accept-Language': `${locale}`,
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
    const data: Country[] = await response.json()
    const countries: FormatedCountry[] = data.map(country => ({
      countryCode: country.countryCode,
      id: country.id,
      name: country.name,
    }))

    return countries
  } catch (error) {
    handleRequestError(error)
    throw new Error('Error loading countries')
  }
}
export const fetchCities = async (selectCountry: FormatedCountry) => {
  if (!selectCountry?.countryCode) {
    return
  }
  try {
    const response = await fetch(
      `https://data-api.oxilor.com/rest/regions?countryCode=${selectCountry.countryCode}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data: CitiesResponse = await response.json()

    const cities = data.edges.map(edge => edge.node.name)

    return cities
  } catch (error: unknown) {
    handleRequestError(error)
    throw new Error('Error loading cities')
  }
}
